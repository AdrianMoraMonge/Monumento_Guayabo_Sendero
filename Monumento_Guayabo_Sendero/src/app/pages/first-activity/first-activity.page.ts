import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-activity',
  templateUrl: './first-activity.page.html',
  styleUrls: ['./first-activity.page.scss'],
})
export class FirstActivityPage implements OnInit {

  crossword: string[][] = [["O","N","O","A","L"], ["C","O","G","R","I"], ["O","E","R","T","E"], ["T","U","N","E","A"], ["C","F","G","I","R"]];
  showLetters: boolean[][] = [[false,false,false,false,false], [false,false,false,false,false], [false,false,false,false,false], [false,false,false,false,false], [false,false,false,false,false]];
  templates_crossword: string[][] = [["crossword_first.svg","crossword_first.svg","crossword_first.svg","crossword_third.svg","crossword_third.svg"], ["crossword_first.svg","crossword_third.svg","crossword_third.svg","crossword_third.svg","crossword_template.svg"], ["crossword_template.svg","crossword_second.svg","crossword_second.svg","crossword_second.svg","crossword_template.svg"], ["crossword_template.svg","crossword_second.svg","crossword_template.svg","crossword_second.svg","crossword_template.svg"], ["crossword_template.svg","crossword_second.svg","crossword_template.svg","crossword_template.svg","crossword_template.svg"]];

  constructor() { }

  ngOnInit() {
  }

  markLetter(i, j){
    this.showLetters[i][j] = !this.showLetters[i][j];
  }

}
