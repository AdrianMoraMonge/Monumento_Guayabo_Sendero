import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeciesListPage } from './species-list.page';

const routes: Routes = [
  {
    path: '',
    component: SpeciesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeciesListPageRoutingModule {}
