import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Problem } from '../_models/problem';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemsService } from '../_services/problems.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-problems',
  templateUrl: './search-problems.component.html',
  styleUrls: ['./search-problems.component.css']
})
export class SearchProblemsComponent implements OnInit {
  @Output() problemChange = new EventEmitter();
  searchField: FormControl = new FormControl();
  userInput = '';
  dataSource: Problem[] = [];

  constructor(
    private problemService: ProblemsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe(async (userInput) => {
        this.userInput = userInput;
        this.dataSource = [];
        this.problemService.searchProblems(userInput).subscribe(response => {
          this.dataSource = response.body.problems;
        });
        this.problemChange.emit(this.userInput);
      });
  }

}
