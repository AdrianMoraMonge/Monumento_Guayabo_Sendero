import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SecondActivityModalComponent } from './pages/second-activity/second-activity-modal/second-activity-modal.component'; 
import { ThirdActivityModalComponent } from './pages/third-activity/third-activity-modal/third-activity-modal.component'; 
import { SeventhActivityModalComponent } from './pages/seventh-activity/seventh-activity-modal/seventh-activity-modal.component'; 
import { RecordModalComponent } from './pages/record/record-modal/record-modal.component'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, RecordModalComponent, SecondActivityModalComponent, ThirdActivityModalComponent, SeventhActivityModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
