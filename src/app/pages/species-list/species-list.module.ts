import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeciesListPageRoutingModule } from './species-list-routing.module';

import { SpeciesListPage } from './species-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeciesListPageRoutingModule
  ],
  declarations: [SpeciesListPage]
})
export class SpeciesListPageModule {}
