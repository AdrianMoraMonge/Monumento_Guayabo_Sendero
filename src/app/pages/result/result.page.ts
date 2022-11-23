import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { HostListener } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  imgBirds: string[] = ["aceite_bird.png", "peregrino_bird.png", "colibri_manglar_bird.png"];
  listBirds: string[] = ["Pájaro Aceite", "Halcón Peregrino", "Colibrí de Manglar"];
  score: number = 0;

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
    .filter(event => event instanceof NavigationEnd && event.url == '/result')
    .subscribe((value) => {
      this.confirmTour();
    });
  }

  ngOnInit() {
  }

  public async presentAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert_style',
      header: title,
      message: msg,
      buttons: ['Entendido']
  });
    await alert.present();
  }

  finish(){
    this.router.navigateByUrl('final');
  }

  getScore(){
    this.activitiesService.getScore({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let score = list[0].Result;
            this.score = Math.round((score*100)/31);
            return;
          }
          this.presentAlert('Error', 'Ocurrió un error, intente de nuevo.');
    });
  }

  confirmTour(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.numberActivitiesSolved({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let activitiesSolved = list[0].Result;
            if(activitiesSolved != 13){
              this.router.navigateByUrl('map');
              return;
            }
            this.getScore();
            return;
          }
          this.presentAlert('Error', 'Ocurrió un error, intente de nuevo.');
      });
      return;
    }
    this.router.navigateByUrl('home');
  }

}
