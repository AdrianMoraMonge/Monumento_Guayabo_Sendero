import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdActivityPage } from './third-activity.page';

const routes: Routes = [
  {
    path: '',
    component: ThirdActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdActivityPageRoutingModule {}
