import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdActivityPageRoutingModule } from './third-activity-routing.module';

import { ThirdActivityPage } from './third-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThirdActivityPageRoutingModule
  ],
  declarations: [ThirdActivityPage]
})
export class ThirdActivityPageModule {}
