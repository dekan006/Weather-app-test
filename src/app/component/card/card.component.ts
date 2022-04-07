import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  temp: number = 0;
  iconNumber: string ='';
  iconHtml: string = '';
  humidity: number = 0;
  wind: number = 0;
  updateData: boolean = false;

  @Input() city: string ='';
  
  constructor(
    public weatherService: WeatherService
  ) {
    this.weatherService.interval$.subscribe( (res: void) => {
      this.weatherService.getWeatherCity(this.city).subscribe( (res: any) => {
          this.temp = this.weatherService.convertKelvinToCelsius(res.main.temp);
          this.humidity = res.main.humidity;
          this.wind = res.wind.speed;
          this.iconNumber = res.weather[0].icon.slice(0,2);
          this.iconHtml = `<i class="${this.weatherService.iconHtml[this.iconNumber]}"></i>`;
          this.updateData = true;
          })
  })
   }

  ngOnInit(): void {
        
  }
}
