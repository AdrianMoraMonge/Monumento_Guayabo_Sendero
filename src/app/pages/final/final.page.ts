import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { AlertController } from '@ionic/angular';
import { HostListener } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs-compat/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter'; 

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {
  private _routerSub = Subscription.EMPTY;
  rewards: string[] = ["gold.svg", "silver.svg", "copper.svg", "medal.svg"];
  textTitle: string[] = ["¡Has ganado la copa de oro!", "¡Has ganado la copa de plata!", "¡Has ganado la copa de bronce!", "¡Felicidades por completar el recorrido!"];
  prizeWon: number = 0;


  constructor() { }

  ngOnInit() {
  }

}
