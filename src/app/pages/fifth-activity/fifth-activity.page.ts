import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { FifthActivityModalComponent } from './fifth-activity-modal/fifth-activity-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-fifth-activity',
  templateUrl: './fifth-activity.page.html',
  styleUrls: ['./fifth-activity.page.scss'],
})
export class FifthActivityPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  firstForm: FormGroup;
  secondForm: FormGroup;
  birdsActivity: string[] = ["first", "second", "third"];
  templatesActivity: string[][] = [["crossword_template", "crossword_template", "activity_five_green", "crossword_template", "crossword_template", "activity_five_red"], ["activity_five_orange", "crossword_template", "crossword_template", "crossword_template"], ["activity_five_purple", "crossword_template", "crossword_template", "crossword_template", "crossword_template", "crossword_template", "activity_five_blue"]];
  templatesResponse: string[] = ["activity_five_orange", "activity_five_green", "activity_five_blue", "activity_five_purple", "activity_five_red"];
  modified: boolean = false;
  bird_names: string[] = ["", "", "", ""];
  bird_text: string[] = ["", "", "", ""];
  user_response: string = "";

  constructor(private fb: FormBuilder, private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd && event.url == '/fifth-activity')
      .subscribe((value) => {
        this.confirmTour();
    });

    this.firstForm = this.fb.group({
      first: [null, [Validators.required, Validators.minLength(3)]],
      second: [null, [Validators.required, Validators.minLength(3)]],
      third: [null, [Validators.required, Validators.minLength(3)]]
    });

    this.secondForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]]
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

  modelChanged(_word, i) {
    if(this.modified) {
      this.modified = false;
      return;
    }
    if((i == 0 && _word.length > 6) || (i == 1 && _word.length > 4) || (i == 2 && _word.length > 7) || (i == 3 && _word.length > 5)) {
      this.modified = true;
      _word = this.bird_names[i];
      if(i < 3)
        this.firstForm.get(this.birdsActivity[i]).setValue(_word);
      else
        this.secondForm.get("name").setValue(_word);
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
    this.bird_text[i] = _word.toUpperCase();
    this.bird_names[i] = _word;
    if(i < 3)
      this.firstForm.get(this.birdsActivity[i]).setValue(_word);
    else
      this.secondForm.get("name").setValue(_word);
  }

  public async confirmAlert() {
    if(!this.firstForm.get("first").valid && !this.firstForm.get("second").valid && !this.firstForm.get("third").valid && !this.secondForm.get("name").valid) {
      this.presentAlert("Error", "Completa todos los nombres de las aves.");
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
      component: FifthActivityModalComponent,
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
      this.user_response = ((this.secondForm.value.name).charAt(0)).toUpperCase() + ((this.secondForm.value.name).substring(1)).toLowerCase();
      this.activitiesService.checkActivity({_idUser: this.cookieService.get('idUser'), answer: this.user_response, id_excercise: 5})
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
            if(activitiesSolved != 4){
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
