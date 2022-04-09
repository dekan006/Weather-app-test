import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  cities: Array<string> = [];
  cardCities: Array<string> =[];
  iconHtml: any;
  timer$: any;
  interval$: Subject<void> = new Subject<void>();
  intervalRun: boolean = false;
  showModalDel: boolean = false;
  deleteCity: string = '';

  APIKey: string = "3b18db63a72ef2bceaa813d49d7f0dd8";
  url: string = "https://api.openweathermap.org/data/2.5/weather?";

  constructor(
    private http: HttpClient
  ) 
  { 
    localStorage.getItem('cardCities')?.split(',').map( (el: any) => 
      {if (el) {
        this.cardCities.push(el);
      }}
    );

    this.http.get<Object>('assets/config.json').subscribe((res: any) =>
        { this.cities = res.cities.filter((el: string) => 
            !this.cardCities.includes(el));

            localStorage.setItem('cities', this.cities.join());
            this.iconHtml = res.iconHtml;
            console.log('service', this.iconHtml);
        });  
  }
  
  addCardCity(city: string) {
    if (city) {
      this.cardCities.push(city);
      localStorage.setItem('cardCities', this.cardCities.join());
      this.cities = this.cities.filter((el: string) => el != city);
      localStorage.setItem('cities', this.cities.join())
    }
  }

  showDialogDeleteCity(city: string) {
    this.showModalDel = true;
    this.deleteCity = city;
  }

  deleteCardCity(city: string) {
    this.cities.push(city);
    this.cardCities = this.cardCities.filter((el: string) => 
        !this.cities.includes(el));
        localStorage.setItem('cardCities', this.cardCities.join()); 
        localStorage.setItem('cities', this.cities.join()); 
    this.showModalDel = false;
  }
  
  getWeatherCity(city: string) {
    return this.http.get(`${this.url}q=${city}&appid=${this.APIKey}`);
  }

  convertKelvinToCelsius(temp: number) {
    return Math.round(temp - 273.15);
  }

  startInterval() {
    this.intervalRun = true;
    console.log('StartInterval')
    this.interval$.next(); 
    this.timer$ = interval(5000)
      .subscribe(val => {
          this.interval$.next(); 
    });
  }

  stopInterval() {
    this.timer$.unsubscribe();
    this.intervalRun = false;
    console.log('StopInterval')
  }
}

