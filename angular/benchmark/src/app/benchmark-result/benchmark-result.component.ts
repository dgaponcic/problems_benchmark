import { Component, OnInit, Input } from '@angular/core';
import { TestResult } from '../_services/fileUpload.service';
import { ResultsService } from '../_services/results.service';
import { HttpErrorResponse } from '@angular/common/http';


enum SubmitStatus {
  Pending = 0,
  Succes = 1,
  Error = 2,
}

@Component({
  selector: 'app-benchmark-result',
  templateUrl: './benchmark-result.component.html',
  styleUrls: ['./benchmark-result.component.css']
})
export class BenchmarkResultComponent implements OnInit {

  @Input() result: TestResult;
  @Input() problemId: string;

  constructor(private resultsService: ResultsService) { }
  tableInput = [];
  submitStatus: SubmitStatus;
  displayedColumns: string[] = ['avg_time', 'best_time', 'st_deviation', 'percentage'];

  ngOnInit() {
    this.tableInput = [this.result];
  }

  submit() {
    this.submitStatus = SubmitStatus.Pending;
    this.resultsService.submitResult(this.problemId, this.result)
      .subscribe(
        res => {
          this.submitStatus = SubmitStatus.Succes;
        }, (error: HttpErrorResponse) => {
          this.submitStatus = SubmitStatus.Error;
        });
  }
}
