import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SixthActivityPage } from './sixth-activity.page';

const routes: Routes = [
  {
    path: '',
    component: SixthActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SixthActivityPageRoutingModule {}
