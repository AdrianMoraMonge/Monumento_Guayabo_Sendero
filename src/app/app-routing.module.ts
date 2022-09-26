import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'first-activity',
    loadChildren: () => import('./pages/first-activity/first-activity.module').then( m => m.FirstActivityPageModule)
  },
  {
    path: 'second-activity',
    loadChildren: () => import('./pages/second-activity/second-activity.module').then( m => m.SecondActivityPageModule)
  },
  {
    path: 'fourth-activity',
    loadChildren: () => import('./pages/fourth-activity/fourth-activity.module').then( m => m.FourthActivityPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
