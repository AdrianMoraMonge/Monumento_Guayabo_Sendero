import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { FirstActivityModalComponent } from './first-activity-modal/first-activity-modal.component'; 

@Component({
  selector: 'app-first-activity',
  templateUrl: './first-activity.page.html',
  styleUrls: ['./first-activity.page.scss'],
})
export class FirstActivityPage implements OnInit {

  crossword: string[][] = [["O","N","O","A","L"], ["C","O","G","R","I"], ["O","E","R","T","E"], ["T","U","N","E","A"], ["C","F","G","I","R"]];
  showLetters: boolean[][] = [[false,false,false,false,false], [false,false,false,false,false], [false,false,false,false,false], [false,false,false,false,false], [false,false,false,false,false]];
  templates_crossword: string[][] = [["crossword_first.svg","crossword_first.svg","crossword_first.svg","crossword_third.svg","crossword_third.svg"], ["crossword_first.svg","crossword_third.svg","crossword_third.svg","crossword_third.svg","crossword_template.svg"], ["crossword_template.svg","crossword_second.svg","crossword_second.svg","crossword_second.svg","crossword_template.svg"], ["crossword_template.svg","crossword_second.svg","crossword_template.svg","crossword_second.svg","crossword_template.svg"], ["crossword_template.svg","crossword_second.svg","crossword_template.svg","crossword_template.svg","crossword_template.svg"]];
  user_response: string = "_________________________";

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this.confirmTour();
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

  public async confirmAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert_style',
      header: "Confirmar",
      message: "¿Estás seguro de tu respuesta?",
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

  markLetter(i, j){
    this.showLetters[i][j] = !this.showLetters[i][j];
    if(this.showLetters[i][j])
      this.user_response = this.user_response.substring(0, i*5+j) + this.crossword[i][j] + this.user_response.substring(i*5+j+1);
    else
    this.user_response = this.user_response.substring(0, i*5+j) + "_" + this.user_response.substring(i*5+j+1);
  }

  back(){
    this.router.navigateByUrl("map");
  }
  
  completeActivity(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.checkFirstActivity({_idUser: this.cookieService.get('idUser'), answer: this.user_response, id_excercise: 1})
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

  async openModal(_points: number) {
    const modal = await this.modalCtrl.create({
      cssClass: 'remember_modal',
      component: FirstActivityModalComponent,
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

  confirmTour(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.numberActivitiesSolved({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          console.log(res);
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let activitiesSolved = list[0].Result;
            if(activitiesSolved >= 1){
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
