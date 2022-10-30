import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record-modal',
  templateUrl: './record-modal.component.html',
  styleUrls: ['./record-modal.component.scss'],
})

@NgModule({
  imports: [CommonModule]
})
export class RecordModalComponent implements OnInit {
  colorBird: string = "firstBirdColor";
  numBird: number = 0;
  titles: string[] = ["Tipo de Pico", "Tipo de Canto", "Colores de Aves", "Alimentación", "Significados"];
  answers: string[][] = [["Cono", "Grave", "Café", "Aguacatillo", "Predice muerte y clima"], 
                        ["Fuerte", "Potente", "Verde", "Plaga", "Representa a líderes"],
                        ["Largo", "Agudo", "Gris", "Flor de manglar", "Anuncia buenas noticias"]];
  colors: string[] = ["brown_circle.svg", "green_circle.svg", "gray_circle.svg"];

  constructor(private modalCtrl: ModalController, public navParams: NavParams) { 
    if(navParams.get("numBird") == 1){
      this.colorBird = "firstBirdColor";
    }
    else if(navParams.get("points") == 2){
      this.colorBird = "secondBirdColor";
    }
    else{
      this.colorBird = "thirdBirdColor";
    }
    this.numBird = navParams.get("numBird") - 1;
  }
  ngOnInit() {}

  close() {
    return this.modalCtrl.dismiss(null, 'close');
  }
}
