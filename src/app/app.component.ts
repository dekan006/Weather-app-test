import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather-app-test';
  showModal: boolean = false;
  cities: Array<string> = [];

  constructor(
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.http.get<Object>('assets/cities.json').subscribe((res: any) =>
      { this.cities = res.cities }
      );
  }
}
