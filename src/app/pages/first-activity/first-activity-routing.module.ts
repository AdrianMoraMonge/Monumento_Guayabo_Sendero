import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstActivityPage } from './first-activity.page';

const routes: Routes = [
  {
    path: '',
    component: FirstActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstActivityPageRoutingModule {}
