import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { HostListener } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  rewards: string[] = ["gold.svg", "silver.svg", "copper.svg", "medal.svg"];
  textTitle: string[] = ["¡Has ganado la copa de oro!", "¡Has ganado la copa de plata!", "¡Has ganado la copa de bronce!", "¡Felicidades por completar el recorrido!"];
  prizeWon: number = 0;
  score: number = 0;

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
    .filter(event => event instanceof NavigationEnd && event.url == '/final')
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

  getScore(){
    this.activitiesService.getScore({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let score = list[0].Result;
            this.score = Math.round((score*100)/31);
            if(this.score >= 85)
              this.prizeWon = 0;
            else if(this.score >= 75)
              this.prizeWon = 1;
            else if(this.score >= 68)
              this.prizeWon = 2;
            else
              this.prizeWon = 3;
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
