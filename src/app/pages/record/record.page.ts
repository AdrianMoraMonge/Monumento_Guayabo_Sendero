import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { HostListener } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { RecordModalComponent } from './record-modal/record-modal.component';
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
  numBird: number = 0;
  scrWidth: any;
  sizeCol: number = 2.2;
  textButton: string[] = ["Siguiente", "Siguiente", "Siguiente", "Listo"];
  feeding_birds_images: string[] = ["carnivorous_bird.svg", "seed_bird.svg", "frugivorous_bird.svg", "insectivorous_bird.svg", "nectarivorous_bird.svg"];
  feeding_birds_text: string[] = ["carnívoro", "semillero", "frugívoro", "insectívoro", "nectarívoro"];
  singing_birds_images: string[] = ["medium_bird.svg", "small_bird.svg", "big_bird.svg"];
  singing_birds_text: string[] = ["cantos graves", "cantos agudos", "cantos potentes"];
  habits_birds_images: string[] = ["daytime_colors.svg", "night_colors.svg"];
  habits_birds_text: string[] = ["colores claros y llamativos", "colores oscuros"];
  bird_functions_images: string[] = ["scatter_bird.svg", "biological_controller_bird.svg", "pollinating_bird.svg"];
  bird_functions_text: string[] = ["dispersor", "controlador biológico", "polinizador"];
  bird_relevance_images: string[] = ["medium_bird.svg", "big_bird.svg", "hummingbird.svg"];
  bird_relevance_text: string[] = ["aves nocturnas", "aves rapaces", "aves coloridas"];

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
      .filter(event => event instanceof NavigationEnd && event.url == '/record')
      .subscribe((value) => {
        //this.confirmTour();
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

  public async confirmAlert() {
    if(this.numBird == 0){
      this.numBird++;
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
            //this.completeActivity();
          }  
        }
      ]
  });

  await alert.present();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      cssClass: 'remember_modal',
      component: RecordModalComponent,
      componentProps: {
        numBird: this.numBird
      }
    });
    modal.present();
    const {data, role} = await modal.onWillDismiss();
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
