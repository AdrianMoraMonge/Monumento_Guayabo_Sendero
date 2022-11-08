import { Component } from '@angular/core';
import { HostListener } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service'; 
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers : [UserService]
})
export class HomePage {
  nameForm: FormGroup;
  scrWidth: any;
  smallSize: boolean = false;
  loading: HTMLIonLoadingElement;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if(this.scrWidth <= 405)
      this.smallSize = true;
    else
      this.smallSize = false;
  }

  constructor(private loadingCtrl: LoadingController, private fb: FormBuilder, private userService: UserService, private alertController: AlertController, private cookieService: CookieService, private router: Router) {
    this.getScreenSize();
    this.nameForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Cargando datos...',
      cssClass: 'custom-loading',
    });

    this.loading.present();
  }

  public async presentAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert_style',
      header: title,
      message: msg,
      buttons: ['Entendido']
  });

    await alert.present();
  }

  startTour(){
    if(this.nameForm.valid) {
      this.showLoading();
      this.userService.insertUser({name: this.nameForm.value.name})
      .subscribe(res => {
        let list = res as [{Result}];
        if(list != null && list.length > 0){
          let idUser = list[0].Result;
          if(idUser > 0){
            const dateNow = new Date();
            dateNow.setMinutes(dateNow.getMinutes() + 120);
            this.cookieService.set('idUser', idUser, dateNow);
            this.loading.dismiss();
            this.router.navigateByUrl('map');
            return;
          }
        }
        this.loading.dismiss();
        this.presentAlert('Error', 'Ocurrió un error, intente de nuevo.');
      });
    }
  }
}
