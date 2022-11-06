import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeventhActivityPage } from './seventh-activity.page';

const routes: Routes = [
  {
    path: '',
    component: SeventhActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeventhActivityPageRoutingModule {}
