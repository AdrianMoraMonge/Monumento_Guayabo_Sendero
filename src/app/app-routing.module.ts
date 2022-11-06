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
  {
    path: 'third-activity',
    loadChildren: () => import('./pages/third-activity/third-activity.module').then( m => m.ThirdActivityPageModule)
  },
  {
    path: 'fifth-activity',
    loadChildren: () => import('./pages/fifth-activity/fifth-activity.module').then( m => m.FifthActivityPageModule)
  },
  {
    path: 'sixth-activity',
    loadChildren: () => import('./pages/sixth-activity/sixth-activity.module').then( m => m.SixthActivityPageModule)
  },
  {
    path: 'seventh-activity',
    loadChildren: () => import('./pages/seventh-activity/seventh-activity.module').then( m => m.SeventhActivityPageModule)
  },
  {
    path: 'record',
    loadChildren: () => import('./pages/record/record.module').then( m => m.RecordPageModule)
  },
  {
    path: 'species-list',
    loadChildren: () => import('./pages/species-list/species-list.module').then( m => m.SpeciesListPageModule)
  },
  {
    path: 'final',
    loadChildren: () => import('./pages/final/final.module').then( m => m.FinalPageModule)
  },










];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
