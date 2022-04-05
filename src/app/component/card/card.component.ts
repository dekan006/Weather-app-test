import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() city: string ='';

  constructor() { }

  ngOnInit(): void {

  }
  deleteCardCity(city: string) {
    console.log(city);
  }
}
