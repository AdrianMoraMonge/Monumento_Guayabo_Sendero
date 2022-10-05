import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-third-activity-modal',
  templateUrl: './third-activity-modal.component.html',
  styleUrls: ['./third-activity-modal.component.scss'],
})
export class ThirdActivityModalComponent implements OnInit {
  textTitle: string = "¡Bien hecho!";
  colorTitle: string = "correctAnswer";

  constructor(private modalCtrl: ModalController, public navParams: NavParams) {
    if(navParams.get("points") == 0){
      this.textTitle = "Estuviste cerca, ¡tú puedes!"
      this.colorTitle = "danger";
    }
   }

  ngOnInit() {}

  continue() {
    return this.modalCtrl.dismiss(null, 'continue');
  }

}
