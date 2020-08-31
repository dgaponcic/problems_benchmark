import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { Problem } from '../_models/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {
  private serverURL = 'http://localhost:8080/benchmark/problems';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
    })
  };
  constructor(
    private http: HttpClient,
  ) { }

  getProblems() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
      })
    };
    return this.http.get<{ problems: { _id: string, title: string }[] }>(this.serverURL, this.httpOptions);
  }

  getProblem(id: string): Observable<{ problem: Problem }> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
      })
    };
    return this.http.get<{ problem: Problem }>(`${this.serverURL}/${id}`, this.httpOptions);
  }

  readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) {
        resolve('');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = reader.result.toString();
        resolve(text);

      };
      reader.readAsText(file);
    });
  }

  addProblem(problem) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
      })
    };

    return this.http
      .post<{ msg: string }>(this.serverURL, { ...problem }, httpOptions);

  }

  searchProblems(query: string) {
    const url = `${this.serverURL}/search?search=${query}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
      })
    };

    return this.http.get<{ problems: Problem[] }>(url, {
      observe: 'response',
      ...httpOptions
    });
  }
}
