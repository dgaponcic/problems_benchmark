import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestResult } from './fileUpload.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private serverURL = 'http://localhost:8080/benchmark';

  constructor(
    private http: HttpClient
  ) { }

  submitResult(problemId: string, result: TestResult) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
      })
    };
    return this.http.post<{ msg: string }>(`${this.serverURL}/${problemId}/result`, result, httpOptions);
  }
}
