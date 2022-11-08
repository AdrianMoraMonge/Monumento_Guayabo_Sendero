import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-first-activity-modal',
  templateUrl: './first-activity-modal.component.html',
  styleUrls: ['./first-activity-modal.component.scss'],
})
export class FirstActivityModalComponent implements OnInit {
  textTitle: string = "¡Bien hecho!";
  colorTitle: string = "correctAnswer";

  constructor(private modalCtrl: ModalController, public navParams: NavParams) {
    if(navParams.get("points") == 0){
      this.textTitle = "Lo siento fallaste, ¡puedes lograrlo!. Las respuestas correctas son:"
      this.colorTitle = "danger";
    }
  }
  
  ngOnInit() {}

  continue() {
    return this.modalCtrl.dismiss(null, 'continue');
  }
}
