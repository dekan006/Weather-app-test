import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherService } from 'src/app/service/weather.service';
import { Weather } from 'src/app/model/weather';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnDestroy{
  cardSubject$: Subject<void> = new Subject();
  weather: Weather = {
    temp: 0,
    humidity: 0,
    wind: 0,
    iconNumber: '',
    iconHtml: '',
    isUpdateWeather: false,
    updateDate: 0
  };
  
  @Input() city: string ='';
  
  constructor(
    public weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {

  this.weatherService.interval$.subscribe( (res: void) => { 
      this.cardSubject$.next();
  })

  this.cardSubject$.subscribe( (res: void) => {
      this.weatherService.getWeatherCity(this.city).subscribe( (res: any) => {
          this.weather.temp = this.weatherService.convertKelvinToCelsius(res.main.temp);
          this.weather.humidity = res.main.humidity;
          this.weather.wind = res.wind.speed;
          this.weather.iconNumber = res.weather[0].icon.slice(0,2);
          this.weather.iconHtml = `<i class="${this.weatherService.iconHtml[this.weather.iconNumber]}"></i>`;
          this.weather.isUpdateWeather = true;
          this.weather.updateDate = Date.now();
          console.log(this.weather.temp, this.city);
          this.cdr.detectChanges();
      })
  })

  }
  ngOnInit(): void {
  }
   
  ngOnDestroy():void {
    this.cardSubject$.complete();
    console.log('Destroy', this.city);
  }
}