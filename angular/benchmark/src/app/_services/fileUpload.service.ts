import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';

export interface TestResult {
  result: number;
  avg_time: number;
  best_time: number;
  st_deviation: number;
}

export interface BenchmarkResult {
  result: TestResult;
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

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

  async postTest(testInput: File, testOutput: File, problem: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
      })
    };
    const input = await this.readFileContent(testInput);
    const output = await this.readFileContent(testOutput);

    const endpoint = 'http://localhost:8080/benchmark/tests';

    const data = { input, output, problem };
    return this.http
      .post<BenchmarkResult>(endpoint, data, httpOptions);
  }

  async postFile(file: File, extension: string, problemId: string): Promise<Observable<BenchmarkResult>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${((JSON.parse(localStorage.getItem('currentUser')) as User).token)}`
      })
    };
    const program = await this.readFileContent(file);
    const endpoint = 'http://localhost:8080/benchmark';

    const data = { program, extension, problem: problemId };
    return this.http
      .post<BenchmarkResult>(endpoint, data, httpOptions);
  }
}
