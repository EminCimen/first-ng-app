import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { UsersService } from '../../services/users.service';
import { WeatherResponse } from '../../models/weather.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);

  user: User | null = null;
  weather: WeatherResponse | null = null;
  cityName: string = 'İstanbul';
  loading: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser) as User;
        console.log("LocalStorage'dan kullanıcı bilgisi:", this.user);
      } catch (e) {
        console.error(
          "LocalStorage'daki kullanıcı verisi JSON formatında değil:",
          e
        );
      }
    } else {
      console.log("LocalStorage'da currentUser anahtarı bulunamadı");
    }

    this.getWeatherData();
  }

  getWeatherData(): void {
    this.loading = true;
    this.error = null;

    if (this.user?.address?.city) {
      console.log('Kullanıcı şehri bulundu:', this.user.address.city);
      this.cityName = this.user.address.city;
    } else {
      console.log('Kullanıcı şehri bulunamadı, varsayılan şehir kullanılıyor');
    }

    this.weatherService.getWeather(this.cityName).subscribe({
      next: (data) => {
        this.weather = data;
        this.loading = false;
        console.log('Hava durumu verileri:', data);
      },
      error: (err) => {
        console.error('Hava durumu alınamadı', err);
        this.error =
          'Hava durumu bilgisi alınamadı. Lütfen daha sonra tekrar deneyin.';
        this.loading = false;
      },
    });
  }
}
