// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<any>(false);
  private userRole = new BehaviorSubject<string>('');
  
  private apiUrl = 'http://localhost:3000/user';

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userRole$(): Observable<string> {
    return this.userRole.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.loggedIn.next(isLoggedIn && isLoggedIn === 'true');
  this.userRole.next(user.role || '');
  }

  login(userRole: string) {
    this.userRole.next(userRole);
    const user = { username: 'user', role: userRole };
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }
  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.userRole.next('');
    this.router.navigate(['/login']);
  }

  registerUser(user: IUser): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.apiUrl, user);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }
}
