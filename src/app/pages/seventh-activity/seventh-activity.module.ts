import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, Validators  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeventhActivityPageRoutingModule } from './seventh-activity-routing.module';

import { SeventhActivityPage } from './seventh-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SeventhActivityPageRoutingModule
  ],
  declarations: [SeventhActivityPage]
})
export class SeventhActivityPageModule {}
