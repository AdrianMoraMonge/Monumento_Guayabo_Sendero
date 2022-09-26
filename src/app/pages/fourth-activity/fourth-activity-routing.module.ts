import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FourthActivityPage } from './fourth-activity.page';

const routes: Routes = [
  {
    path: '',
    component: FourthActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FourthActivityPageRoutingModule {}
