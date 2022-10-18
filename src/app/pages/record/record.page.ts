import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-record',
  templateUrl: './record.page.html',
  styleUrls: ['./record.page.scss'],
})
export class RecordPage implements OnInit {
  private _routerSub = Subscription.EMPTY;

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd && event.url == '/record')
      .subscribe((value) => {
        //this.confirmTour();
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

  back(){
    this.router.navigateByUrl("map");
  }

  public async confirmAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert_style',
      header: "Confirmar",
      message: "¿Estás seguro de su respuesta?",
      buttons: [
        {
          text: 'No, cancelar',
          role: 'cancel',
          cssClass: 'cancel-button',
        },
        {
          text: 'Sí, confirmar',
          handler: () => {
            //this.completeActivity();
          }  
        }
      ]
  });

  await alert.present();
  }

  confirmTour(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.numberActivitiesSolved({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let activitiesSolved = list[0].Result;
            if(activitiesSolved != 5){
              this.router.navigateByUrl('map');
            }
            return;
          }
          this.presentAlert('Error', 'Ocurrió un error, intente de nuevo.');
      });
      return;
    }
    this.router.navigateByUrl('home');
  }
}
