import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { HostListener } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SpeciesListModalComponent } from './species-list-modal/species-list-modal.component';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.page.html',
  styleUrls: ['./species-list.page.scss'],
})
export class SpeciesListPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  textButton: string[] = ["Siguiente", "Siguiente", "Listo"];
  listBirds: string[][] = [["Halcón Peregrino", "Pájaro Campana", "Lapa roja"], 
                          ["Jacamará", "Colibrí de Manglar", "Pinzón Cafetalero"],
                          ["Rualdo", "Lechucita Parda", "Pájaro Aceite"]];
  imgBirds: string[][] = [["peregrino_bird.png", "campana_bird.png", "lapa_bird.png"], 
                          ["jacamara_bird.png", "colibri_manglar_bird.png", "cafetalero_bird.png"],
                          ["rualdo_bird.png", "lechucita__parda.png", "aceite_bird.png"]];
  valueBirds: string[][] = [["peregrino", "campana", "lapa"], 
                          ["jacamara", "colibri", "cafetalero"],
                          ["rualdo", "lechucita", "aceite"]];
  numBird: number = 0;
  scrWidth: any;
  sizeCol: number = 2.2;
  selectedValueBird: string;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if(this.scrWidth <= 300)
      this.sizeCol = 2.2;
    else if(this.scrWidth <= 450)
      this.sizeCol = this.scrWidth/107.95;
    else if(this.scrWidth <= 550)
      this.sizeCol = this.scrWidth/88;
    else if(this.scrWidth <= 734)
      this.sizeCol = this.scrWidth/95;
    else if(this.scrWidth <= 910)
      this.sizeCol = this.scrWidth/107;
    else if(this.scrWidth <= 1040)
      this.sizeCol = this.scrWidth/115;
    else if(this.scrWidth <= 1140)
      this.sizeCol = this.scrWidth/125;
    else 
      this.sizeCol = this.scrWidth/138;
  }

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private modalCtrl: ModalController, private router: Router) {
    this._routerSub = this.router.events
      .filter(event => event instanceof NavigationEnd && event.url == '/species-list')
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
    this.router.navigateByUrl("record");
  }

  public async confirmAlert() {
    if(this.selectedValueBird == undefined){
      this.presentAlert("Error", "Seleccione el ave desaparecida.");
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
            this.completeActivity(this.selectedValueBird);
          }  
        }
      ]
    });

    await alert.present();
  }

  async openModal(points: number) {
    const modal = await this.modalCtrl.create({
      cssClass: 'remember_modal',
      component: SpeciesListModalComponent,
      componentProps: {
        points: points,
        numBird: this.numBird
      }
    });
    modal.present();
    const {data, role} = await modal.onWillDismiss();
    if(role == "continue"){
      if(this.numBird < 2)
        this.router.navigateByUrl("record");
      else
        this.router.navigateByUrl("result");
      return;
    }
    this.openModal(points);
  }

  completeActivity(respo){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.checkActivity({_idUser: this.cookieService.get('idUser'), answer: respo, id_excercise: (9+this.numBird*2)})
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
            this.selectedValueBird = undefined;
            if(activitiesSolved == 8){
              this.numBird = 0;
            }
            else if(activitiesSolved == 10){
              this.numBird = 1;
            }
            else if(activitiesSolved == 12){
              this.numBird = 2;
            }
            else {
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
