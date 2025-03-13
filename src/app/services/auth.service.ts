import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User, LoginResponse } from '../models/user.model';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // Kullanıcı durumunu signal ile tutuyoruz
  private _currentUser = signal<User | null>(null);
  private _isLoggedIn = signal<boolean>(false);

  // Readonly signaller
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = this._isLoggedIn.asReadonly();

  constructor(private http: HttpClient) {
    // LocalStorage'dan kullanıcı bilgisini kontrol ediyoruz
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
      this._isLoggedIn.set(true);
    }
  }

  login(username: string, password: string): Observable<LoginResponse> {
    // JSONPlaceholder'da password olmadığı için sadece kullanıcı adıyla doğrulama yapıyoruz
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.username === username);

        if (user) {
          // Kullanıcı bulundu ve giriş başarılı (normalde şifre kontrolü de yapılırdı)
          this._currentUser.set(user);
          this._isLoggedIn.set(true);

          // Kullanıcı bilgisini localStorage'a kaydediyoruz
          localStorage.setItem('currentUser', JSON.stringify(user));

          return {
            success: true,
            user: user,
            message: 'Giriş başarılı!',
          };
        } else {
          // Kullanıcı bulunamadı
          return {
            success: false,
            message: 'Kullanıcı adı veya şifre hatalı!',
          };
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of({
          success: false,
          message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.',
        });
      })
    );
  }

  logout(): void {
    this._currentUser.set(null);
    this._isLoggedIn.set(false);
    localStorage.removeItem('currentUser');
  }
}
