import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service'; 
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  maps: string[] = ["assets/first_map.svg", "assets/second_map.svg", "assets/third_map.svg", "assets/fourth_map.svg", "assets/fifth_map.svg", "assets/sixth_map.svg", "assets/seventh_map.svg", "assets/eighth_map.svg"];
  current_map: string = this.maps[0];
  next_activity: number;

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController, private cookieService: CookieService, private router: Router) { 
    this.confirmTour();
  }

  ngOnInit() {
  }

  public async presentAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: ['Entendido']
  });

    await alert.present();
  }

  next_tour_activity(){
    switch(this.next_activity) { 
      case 0: { 
        this.router.navigateByUrl('first-activity');
        break; 
      } 
      case 1: { 
        this.router.navigateByUrl('second-activity');
        break; 
      } 
      default: { 
        //statements; 
        break; 
      } 
    } 
  }

  confirmTour(){
    if(this.cookieService.check('idUser')) {
      this.activitiesService.numberActivitiesSolved({_idUser: this.cookieService.get('idUser')})
        .subscribe(res => {
          let list = res as [{Result}];
          if(list != null && list.length > 0){
            let activitiesSolved = list[0].Result;
            if(activitiesSolved >= 0){
              console.log(activitiesSolved);
              this.next_activity = activitiesSolved;
              this.current_map = this.maps[activitiesSolved];
              return;
            }
          }
          this.presentAlert('Error', 'Ocurrió un error, intente de nuevo.');
      });
      return;
    }
    this.router.navigateByUrl('home');
  }

}
