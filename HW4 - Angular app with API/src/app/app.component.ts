import { Component } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Let\'s get frisky';
  results = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<ApiResponse>('https://api.thecatapi.com/v1/images/search').subscribe(data => {
      this.results = (data[0].url);
    });
  }
}
interface ApiResponse {
  [index: number]: { breeds: object; height: number; id: string; url: string; width: number; };
}

