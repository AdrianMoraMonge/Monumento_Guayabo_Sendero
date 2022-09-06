import { Component } from '@angular/core';
import { HostListener } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nameForm: FormGroup;
  scrWidth:any;
  smallSize:boolean = false;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
    if(this.scrWidth <= 405)
      this.smallSize = true;
    else
      this.smallSize = false;
  }

  constructor(private fb: FormBuilder) {
    this.getScreenSize();
    this.nameForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]]
    });
  }
}
