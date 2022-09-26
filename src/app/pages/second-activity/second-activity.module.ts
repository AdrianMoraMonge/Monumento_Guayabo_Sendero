import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SecondActivityPageRoutingModule } from './second-activity-routing.module';

import { SecondActivityPage } from './second-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SecondActivityPageRoutingModule
  ],
  declarations: [SecondActivityPage]
})
export class SecondActivityPageModule {}
