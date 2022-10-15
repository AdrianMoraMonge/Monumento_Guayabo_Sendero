import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { HostListener } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { ThirdActivityModalComponent } from './third-activity-modal/third-activity-modal.component';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-third-activity',
  templateUrl: './third-activity.page.html',
  styleUrls: ['./third-activity.page.scss'],
})
export class ThirdActivityPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  scrWidth: any;
  smallSize: boolean = false;
  listOptions: number[] = [10,8,6];
  marginOptions: string[] = ["firstTextDown", "secondThirdTextDown", "secondThirdTextDown"];
  colors: string[] = ["Café", "Verde", "Gris", "Rojo", "Amarillo"];
  stateColors: string[][] = [[".svg", ".svg", ".svg", ".svg", ".svg"], [".svg", ".svg", ".svg", ".svg", ".svg"], [".svg", ".svg", ".svg", ".svg", ".svg"]];
  user_response: string[] = ["", "", ""];
  response_colors = "";

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if(this.scrWidth <= 360)
      this.smallSize = true;
    else
      this.smallSize = false;
  }

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd && event.url == '/third-activity')
      .subscribe((value) => {
        this.confirmTour();
    });
    this.getScreenSize();
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

  markOption(numRow: number, numCol: number){
    this.user_response[numRow] = this.colors[numCol];
    for (let index = 0; index < this.stateColors[numRow].length; index++) {

      this.stateColors[numRow][index] = ".svg";
    }
    this.stateColors[numRow][numCol] = "_stroke.svg";
  }

  public async confirmAlert() {
    this.response_colors = "";
    for (let res of this.user_response) {
      if(res == "") {
        this.presentAlert('Aviso', 'Asegúrese de escoger un color para cada una.');
        return;
      }
      this.response_colors += "-" + res;
    }
    this.response_colors = this.response_colors.substring(1);
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
            this.completeActivity();
          }  
        }
      ]
  });

  await alert.present();
}

  async openModal(_points: number) {
    const modal = await this.modalCtrl.create({
      cssClass: 'remember_modal',
      component: ThirdActivityModalComponent,
      componentProps: {
        points: _points
      }
    });
    modal.present();
    const {data, role} = await modal.onWillDismiss();
    if(role == "continue"){
      this.router.navigateByUrl("map");
      return;
    }
    this.openModal(_points);
  }

  completeActivity(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.checkActivity({_idUser: this.cookieService.get('idUser'), answer: this.response_colors, id_excercise: 3})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let points = list[0].Result;
            if(points >= 0){
              this.openModal(points);
              return;
            }
          }
          this.presentAlert('Error', 'Ocurrió un error, intente de nuevo.');
      });
    }
    else
      this.router.navigateByUrl('home');
  }

  confirmTour(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.numberActivitiesSolved({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let activitiesSolved = list[0].Result;
            if(activitiesSolved != 2){
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
