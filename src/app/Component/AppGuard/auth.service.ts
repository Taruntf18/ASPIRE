import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${baseUrl}login`, {
      empno: username,
      pass: password,
    });
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('employeeData') !== null;
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  setUserData(data: any) {
    sessionStorage.setItem('employeeData', JSON.stringify(data));
    this.loginStatus.next(true);
  }

  logout() {
    sessionStorage.removeItem('employeeData');
    this.loginStatus.next(false);
    this.router.navigate(['/']);
  }

  getUser() {
    const user = sessionStorage.getItem('employeeData');
    return user ? JSON.parse(user) : null;
  }

  getRoles(): any {
    const user = sessionStorage.getItem('employeeData');
    return user ? JSON.parse(user).roles : null;
  }
}
