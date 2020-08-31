import { Component, OnInit } from '@angular/core';
import { ProblemsService } from '../_services/problems.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-problems',
  templateUrl: './admin-problems.component.html',
  styleUrls: ['./admin-problems.component.css']
})
export class AdminProblemsComponent implements OnInit {

  addProblemForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private problemsService: ProblemsService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.addProblemForm = this.formBuilder.group({
      title: ['', Validators.required],
      input_cond: ['', Validators.required],
      output_cond: ['', Validators.required],
      time_limit: ['', Validators.required],
      description: ['', Validators.required],
    });

    console.log(this.addProblemForm);
  }

  get f() { return this.addProblemForm.controls; }


  onSubmit() {

    this.submitted = true;

    if (this.addProblemForm.invalid) {
      return;
    }


    this.loading = true;

    const problem = {
      title: this.f.title.value,
      input_cond: this.f.input_cond.value,
      output_cond: this.f.output_cond.value,
      time_limit: this.f.time_limit.value,
      description: this.f.description.value
    };

    this.problemsService.addProblem(problem).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.loading = false;
      });
  }

}
