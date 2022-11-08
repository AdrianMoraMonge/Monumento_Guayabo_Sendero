import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-fourth-activity-modal',
  templateUrl: './fourth-activity-modal.component.html',
  styleUrls: ['./fourth-activity-modal.component.scss'],
})
export class FourthActivityModalComponent implements OnInit {
  textTitle: string = "¡Bien hecho!";
  colorTitle: string = "correctAnswer";

  constructor(private modalCtrl: ModalController, public navParams: NavParams) { 
    if(navParams.get("points") == 0){
      this.textTitle = "Lo siento fallaste, ¡puedes lograrlo!. La respuesta correcta es:"
      this.colorTitle = "danger";
    }
  }

  ngOnInit() {}

  continue() {
    return this.modalCtrl.dismiss(null, 'continue');
  }
}
