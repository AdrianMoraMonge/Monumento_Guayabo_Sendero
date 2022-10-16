import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-seventh-activity-modal',
  templateUrl: './seventh-activity-modal.component.html',
  styleUrls: ['./seventh-activity-modal.component.scss'],
})
export class SeventhActivityModalComponent implements OnInit {
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
