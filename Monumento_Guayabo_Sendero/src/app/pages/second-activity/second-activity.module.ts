import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondActivityPageRoutingModule } from './second-activity-routing.module';

import { SecondActivityPage } from './second-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondActivityPageRoutingModule
  ],
  declarations: [SecondActivityPage]
})
export class SecondActivityPageModule {}
