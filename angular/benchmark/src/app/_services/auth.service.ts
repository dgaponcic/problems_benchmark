import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private serverURL = 'http://localhost:8080/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post<{ msg: string, token: string, role: string }>
      (`${this.serverURL}/login`, credentials, this.httpOptions).pipe(map(data => {
        let user: User;
        if (data && data.token) {
          console.log(data);
          user = { username, token: data.token, role: data.role };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  register(user: User) {
    return this.http.post<{ msg: string, token: string }>(`${this.serverURL}`, user, this.httpOptions).pipe(map(data => { }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuth() {
    return this.http.get(this.serverURL);
  }

  getType() {
    return this.http.get<{ type: string }>(`${this.serverURL}/type`);
  }
}
