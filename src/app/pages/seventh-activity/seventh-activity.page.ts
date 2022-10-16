import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { SeventhActivityModalComponent } from './seventh-activity-modal/seventh-activity-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-seventh-activity',
  templateUrl: './seventh-activity.page.html',
  styleUrls: ['./seventh-activity.page.scss'],
})
export class SeventhActivityPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  codeForm: FormGroup;
  hieroglyphs_list: string[] = ["first_hieroglyphs", "second_hieroglyphs", "third_hieroglyphs"];
  numBird: number = 0;
  birdArrow: string[] = ["firstBirdArrow", "secondBirdArrow", "thirdBirdArrow"];
  birdText: string[] = ["firstBirdText", "secondBirdText", "thirdBirdText"];
  colors: string[] = ["firstBirdColor", "secondBirdColor", "thirdBirdColor"];
  textButton: string[] = ["Siguiente", "Siguiente", "Listo"];
  user_response: string = "";

  constructor(private fb: FormBuilder, private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd && event.url == '/seventh-activity')
      .subscribe((value) => {
        //this.confirmTour();
    });

    this.codeForm = this.fb.group({
      code: [null, [Validators.required, Validators.minLength(3)]]
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
    if(!this.codeForm.get("code").valid) {
      this.presentAlert("Error", "Ingrese el código.");
      return;
    }
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
      component: SeventhActivityModalComponent,
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
      let response: string = ((this.codeForm.value.code).trim()).toLowerCase();
      if(this.numBird == 1 && response == "representa a lideres")
        response = "representa a líderes";
      this.user_response += response.charAt(0).toUpperCase() + response.slice(1);
      if(this.numBird < 2) {
        this.user_response += "-";
        this.numBird++;
        this.codeForm.get("code").setValue("");
        this.codeForm.get("code").markAsUntouched();
        return;
      }
      this.activitiesService.checkActivity({_idUser: this.cookieService.get('idUser'), answer: this.user_response, id_excercise: 7})
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
            if(activitiesSolved != 6){
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
