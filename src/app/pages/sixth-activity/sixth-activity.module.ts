import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SixthActivityPageRoutingModule } from './sixth-activity-routing.module';

import { SixthActivityPage } from './sixth-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SixthActivityPageRoutingModule
  ],
  declarations: [SixthActivityPage]
})
export class SixthActivityPageModule {}
