import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from '../models/weather.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiKey = '7a6271282d1ad69add8cdd2fe9f93955';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  getWeather(city: string): Observable<WeatherResponse> {
    console.log('city', city);
    return this.http
      .get<WeatherResponse>(
        `${this.apiUrl}?q=${city}&APPID=${this.apiKey}&units=metric`
      )
      .pipe(
        catchError((error) => {
          console.error(`${city} için hava durumu alınamadı:`, error);
          // Hata durumunda İstanbul verisi ile devam et
          return this.http.get<WeatherResponse>(
            `${this.apiUrl}?q=Istanbul&APPID=${this.apiKey}&units=metric`
          );
        })
      );
  }

  getWeatherByCoordinates(
    lat: number,
    lon: number
  ): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `${this.apiUrl}?lat=${lat}&lon=${lon}&APPID=${this.apiKey}&units=metric`
    );
  }
}
