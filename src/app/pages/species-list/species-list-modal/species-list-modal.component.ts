import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-species-list-modal',
  templateUrl: './species-list-modal.component.html',
  styleUrls: ['./species-list-modal.component.scss'],
})
export class SpeciesListModalComponent implements OnInit {
  textTitle: string = "¡Bien hecho! has encontado al ave ";
  colorTitle: string = "correctAnswer";
  listBirds: string[] = ["Pájaro Aceite", "Halcón Peregrino", "Colibrí de Manglar"];
  imgBirds: string[] = ["aceite_bird.png", "peregrino_bird.png", "colibri_manglar_bird.png"];
  numBird: number = 0;

  constructor(private modalCtrl: ModalController, public navParams: NavParams) { 
    if(navParams.get("points") == 0){
      this.textTitle = "Fallaste, el ave " + (navParams.get("numBird")+1) + " que desaparecio en realidad fue la siguente:";
      this.colorTitle = "danger";
    }
    else {
      this.textTitle += (navParams.get("numBird")+1) + " que desaparecio";
    }
    this.numBird = navParams.get("numBird");
  }

  ngOnInit() {
    return this.modalCtrl.dismiss(null, 'continue');
  }

}