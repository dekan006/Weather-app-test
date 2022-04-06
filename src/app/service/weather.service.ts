import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  cities: Array<string> = [];
  cardCities: Array<string> =[];
  constructor(
    private http: HttpClient
  ) 
  { 
    localStorage.getItem('cardCities')?.split(',').map( (el: any) => 
      {if (el) {
        this.cardCities.push(el);
      }}
    );

    this.http.get<Object>('assets/cities.json').subscribe((res: any) =>
        { this.cities = res.cities.filter((el: string) => 
          !this.cardCities.includes(el));

          localStorage.setItem('cities', this.cities.join());
          console.log(this.cities);
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

  deleteCardCity(city: string) {
    this.cities.push(city);
    this.cardCities = this.cardCities.filter((el: string) => 
          !this.cities.includes(el));
    localStorage.setItem('cardCities', this.cardCities.join()); 
    localStorage.setItem('cities', this.cities.join());    
  }
}
