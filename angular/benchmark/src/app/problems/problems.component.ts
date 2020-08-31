import { Component, OnInit } from '@angular/core';
import { ProblemsService } from '../_services/problems.service';
import { AuthService } from '../_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  problems: { title: string, _id: string }[];
  constructor(private problemsService: ProblemsService, private router: Router, private authService: AuthService
  ) { }

  ngOnInit() {
    this.problemsService.getProblems()
      .subscribe(
        data => {
          this.problems = JSON.parse(JSON.stringify(data.problems));
          console.log(this.problems);
        }, (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        });
  }

}
