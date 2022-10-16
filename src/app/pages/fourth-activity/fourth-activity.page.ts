import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { HostListener } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { FourthActivityModalComponent } from './fourth-activity-modal/fourth-activity-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-fourth-activity',
  templateUrl: './fourth-activity.page.html',
  styleUrls: ['./fourth-activity.page.scss'],
})
export class FourthActivityPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  scrWidth: any;
  wordForm: FormGroup;
  letters_solution: string = "";
  colSize: number = 1;
  colors: string[] = ["green.svg", "blue.svg", "yellow.svg", "green.svg", "red.svg", "green.svg", "orange.svg", "purple.svg", "pink.svg", "pink.svg", "light_blue.svg"];
  user_response: string = "";
  modified: boolean = false;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if(this.scrWidth <= 360)
      this.colSize = 1.3;
    else
      this.colSize = 1;
  }

  constructor(private fb: FormBuilder, private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd && event.url == '/fourth-activity')
      .subscribe((value) => {
        this.confirmTour();
    });

    this.wordForm = this.fb.group({
      word: [null, [Validators.required, Validators.minLength(3)]]
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

  modelChanged(_word) {
    if(this.modified) {
      this.modified = false;
      return;
    }
    if(_word.length > 11) {
      this.modified = true;
      _word = this.user_response;
      this.wordForm.get("word").setValue(_word);
      return;
    }
    for (let index = 0; index < _word.length; index++) {
      let ascii = _word.charAt(index).toUpperCase().charCodeAt(0);
	    if((ascii <= 64 || ascii >= 91) && ascii != 209){
        _word = _word.replace(_word.charAt(index), "");
        index -= 1;
      }
    }
    this.modified = true;
    this.letters_solution = _word.toUpperCase();
    this.user_response = _word;
    this.wordForm.get("word").setValue(_word);
  }

  public async confirmAlert() {
    if(!this.wordForm.get("word").valid) {
      this.presentAlert("Error", "Ingrese la palabra.");
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
      component: FourthActivityModalComponent,
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
      this.user_response = ((this.wordForm.value.word).charAt(0)).toUpperCase() + ((this.wordForm.value.word).substring(1)).toLowerCase();
      this.activitiesService.checkActivity({_idUser: this.cookieService.get('idUser'), answer: this.user_response, id_excercise: 4})
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
            if(activitiesSolved != 3){
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
