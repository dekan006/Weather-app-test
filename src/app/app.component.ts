import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './service/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit{
  title = 'weather-app-test';
  showModal: boolean = false;
  developDate: number = 2018;
  dataTodayYear = new Date().getFullYear();
  copyrightDate: string = '';

  constructor(
    private http: HttpClient,
    public weatherService: WeatherService
    ) { }

  ngOnInit(): void {
    if (this.developDate == this.dataTodayYear) {
      this.copyrightDate = this.dataTodayYear.toString();
    }
    if (this.developDate < this.dataTodayYear) {
      this.copyrightDate = `${this.developDate} - ${this.dataTodayYear}`;
    }
    if (this.developDate > this.dataTodayYear) {
      this.copyrightDate = this.developDate.toString();
    }
  }
  
}
