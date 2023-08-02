import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import User from './models/User';
import RegisterUser from './models/RegisterUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<any>(
    localStorage.getItem('user') ? true : false
  );
  public user: BehaviorSubject<User> = new BehaviorSubject<any>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );
  public url: string = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  public userLogin = (mobile: string, password: string): Observable<User> => {
    return this.http.post<User>(`${this.url}/api/auth/login`, {
      mobile,
      password,
    });
  };

  public userRegister = (user: RegisterUser): Observable<User> => {
    return this.http.post<User>(`${this.url}/api/auth/register`, user);
  };

  public uploadDp = (dp: FormData): Observable<User> => {
    return this.http.put<User>(`${this.url}/api/auth/upload`, dp);
  };

  public setIsLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public setUser(user: User): void {
    this.user.next(user);
  }

  public getUser(): Observable<User> {
    return this.user.asObservable();
  }
}
