import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FifthActivityPageRoutingModule } from './fifth-activity-routing.module';

import { FifthActivityPage } from './fifth-activity.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    FifthActivityPageRoutingModule
  ],
  declarations: [FifthActivityPage]
})
export class FifthActivityPageModule {}
