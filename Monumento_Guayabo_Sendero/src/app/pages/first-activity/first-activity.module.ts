import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstActivityPageRoutingModule } from './first-activity-routing.module';

import { FirstActivityPage } from './first-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstActivityPageRoutingModule
  ],
  declarations: [FirstActivityPage]
})
export class FirstActivityPageModule {}
