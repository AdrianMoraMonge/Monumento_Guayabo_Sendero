import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-second-activity-modal',
  templateUrl: './second-activity-modal.component.html',
  styleUrls: ['./second-activity-modal.component.scss'],
})

@NgModule({
  imports: [CommonModule]
})
export class SecondActivityModalComponent implements OnInit {
  textTitle: string = "¡Bien hecho!";
  colorTitle: string = "correctAnswer";
  respuestas: boolean[] = [true, true, true];

  constructor(private modalCtrl: ModalController, public navParams: NavParams) { 
    if(navParams.get("points") < 3){
      this.textTitle = "Lo siento fallaste, ¡puedes lograrlo!. Las respuestas correctas son:"
      this.colorTitle = "danger";
    }
    this.respuestas = navParams.get("respuestas");
  }

  ngOnInit() {}

  continue() {
    return this.modalCtrl.dismiss(null, 'continue');
  }
}
