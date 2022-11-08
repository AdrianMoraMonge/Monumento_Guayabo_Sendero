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
  respuestas: string[][] = [["semillero", "cantos graves", "colores oscuros", "dispersor", "aves nocturnas"], ["carnívoro", "cantos potentes", "colores claros y llamativos", "controlador biológico", "aves rapaces"], ["nectarívoro", "cantos agudos", "colores claros y llamativos", "polinizador", "aves coloridas"]];
  selectedValueFirst: string;
  selectedValueSecond: string;
  selectedValueThird: string;
  selectedValueFour: string;
  selectedValueFifth: string;
  deshabilitar: boolean = false;
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

  public async confirmAlert() {
    if(this.deshabilitar){
      this.router.navigateByUrl('species-list');
      return;
    }
    if(this.numBird == 0){
      this.numBird++;
      return;
    }
    else if(this.selectedValueFirst == undefined || this.selectedValueSecond == undefined || this.selectedValueThird == undefined || this.selectedValueFour == undefined || this.selectedValueFifth == undefined){
      this.presentAlert("Error", "Complete el formulario del expediente.");
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
            if(this.selectedValueFirst != this.respuestas[this.numBird-1][0]){
              this.presentAlert("Error", "La alimentación de esta ave no es la correcta.");
            }
            else if(this.selectedValueSecond != this.respuestas[this.numBird-1][1]){
              this.presentAlert("Error", "El canto de esta ave no es la correcta.");
            }
            else if(this.selectedValueThird != this.respuestas[this.numBird-1][2]){
              this.presentAlert("Error", "Los hábitos de esta ave no coinciden con la respuesta.");
            }
            else if(this.selectedValueFour != this.respuestas[this.numBird-1][3]){
              this.presentAlert("Error", "La fución del ave no es correcta.");
            }
            else if(this.selectedValueFifth != this.respuestas[this.numBird-1][4]){
              this.presentAlert("Error", "La relevancia arqueológica del ave no es correcta.");
            }
            else{
              this.completeActivity(this.respuestas[this.numBird-1][0]+"-"+this.respuestas[this.numBird-1][1]+"-"+this.respuestas[this.numBird-1][2]+"-"+this.respuestas[this.numBird-1][3]+"-"+this.respuestas[this.numBird-1][4]);
            }
          }  
        }
      ]
    });
    await alert.present();
  }

  loadRecord(num: number){
    this.deshabilitar = true;
    if(num == 0){
      this.selectedValueFirst = "semillero";
      this.selectedValueSecond = "cantos graves";
      this.selectedValueThird = "colores oscuros";
      this.selectedValueFour = "dispersor";
      this.selectedValueFifth = "aves nocturnas";
    }
    else if(1){
      this.selectedValueFirst = "carnívoro";
      this.selectedValueSecond = "cantos potentes";
      this.selectedValueThird = "colores claros y llamativos";
      this.selectedValueFour = "controlador biológico";
      this.selectedValueFifth = "aves rapaces";
    }
    else{
      this.selectedValueFirst = "nectarívoro";
      this.selectedValueSecond = "cantos agudos";
      this.selectedValueThird = "polinizador";
      this.selectedValueFour = "colores claros y llamativos";
      this.selectedValueFifth = "aves coloridas";
    }
  }

  completeActivity(respo){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.checkActivity({_idUser: this.cookieService.get('idUser'), answer: respo, id_excercise: (8+(this.numBird-1)*2)})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let points = list[0].Result;
            if(points >= 0){
              this.router.navigateByUrl('species-list');
              return;
            }
          }
          this.presentAlert('Error', 'Ocurrió un error, intente de nuevo.');
      });
    }
    else
      this.router.navigateByUrl('home');
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
    if(role == "close"){
      return;
    }
    this.openModal();
  }

  confirmTour(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.numberActivitiesSolved({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let activitiesSolved = list[0].Result;
            console.log(activitiesSolved);
            if(activitiesSolved == 7){
              this.deshabilitar = false;
              this.numBird = 0;
            }
            else if(activitiesSolved == 8){
              this.numBird = 1;
              this.loadRecord(0);
            }
            else if(activitiesSolved == 9){
              this.selectedValueFirst, this.selectedValueSecond, this.selectedValueThird, this.selectedValueFour, this.selectedValueFifth = undefined;
              this.deshabilitar = false;
              this.numBird = 2;
            }
            else if(activitiesSolved == 10){
              this.numBird = 2;
              this.loadRecord(1);
            }
            else if(activitiesSolved == 11){
              this.selectedValueFirst, this.selectedValueSecond, this.selectedValueThird, this.selectedValueFour, this.selectedValueFifth = undefined;
              this.deshabilitar = false;
              this.numBird = 3;
            }
            else if(activitiesSolved == 12){
              this.numBird = 3;
              this.loadRecord(2);
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
