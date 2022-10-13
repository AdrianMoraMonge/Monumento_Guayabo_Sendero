import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FifthActivityPage } from './fifth-activity.page';

const routes: Routes = [
  {
    path: '',
    component: FifthActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FifthActivityPageRoutingModule {}
