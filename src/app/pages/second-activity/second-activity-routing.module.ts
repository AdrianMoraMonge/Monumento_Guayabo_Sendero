import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondActivityPage } from './second-activity.page';

const routes: Routes = [
  {
    path: '',
    component: SecondActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondActivityPageRoutingModule {}
