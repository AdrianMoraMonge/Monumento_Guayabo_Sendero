import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FourthActivityPageRoutingModule } from './fourth-activity-routing.module';

import { FourthActivityPage } from './fourth-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FourthActivityPageRoutingModule
  ],
  declarations: [FourthActivityPage]
})
export class FourthActivityPageModule {}
