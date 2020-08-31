import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemsService } from '../_services/problems.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {

  id: string;
  problem: { _id: string, title: string, description: string, input_cond: string, output_cond: string, time_limit: number };
  constructor(
    private route: ActivatedRoute,
    private problemsService: ProblemsService,
  ) { }

  ngOnInit() {
    this.getProblem();
  }

  getProblem() {
    this.id = this.route.snapshot.params.id;
    this.problemsService.getProblem(this.id).subscribe(data => {
      this.problem = JSON.parse(JSON.stringify(data.problem));
    }, error => {
      console.log(error);
    });
  }
}
