import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  maps: string[] = ["assets/first_map.svg", "assets/second_map.svg", "assets/third_map.svg", "assets/fourth_map.svg", "assets/fifth_map.svg", "assets/sixth_map.svg", "assets/seventh_map.svg", "assets/eighth_map.svg"];
  current_map: string = this.maps[0];

  constructor() { }

  ngOnInit() {
  }

}
