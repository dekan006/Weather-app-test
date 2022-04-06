import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() city: string ='';

  constructor(
    public weatherService: WeatherService
  ) { }

  ngOnInit(): void {

  }
  
  deleteCardCity(city: string) {
    console.log(city);
  }


}
