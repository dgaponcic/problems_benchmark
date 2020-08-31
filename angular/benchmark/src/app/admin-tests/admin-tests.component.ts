import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../_services/fileUpload.service';
import { Test } from '../_models/test';
import { ProblemsService } from '../_services/problems.service';

@Component({
  selector: 'app-admin-tests',
  templateUrl: './admin-tests.component.html',
  styleUrls: ['./admin-tests.component.css']
})
export class AdminTestsComponent implements OnInit {

  tests: Test[] = [];
  index = 0;
  problem = null;
  submitted = false;
  result = null;
  constructor(private fileUploadService: FileUploadService, private problemsService: ProblemsService) { }

  ngOnInit() {
    this.addTest();
  }

  async addTest() {
    this.index += 1;
    const test = { input: null, output: null };
    this.tests.push(test);
  }

  async uploadFiles(files: FileList, type: string, index: number) {
    this.tests[index][type] = files.item(0);
    console.log(this.tests);
  }

  resetFileHTML() {
    (document.getElementById('file-input') as HTMLInputElement).value = null;
  }

  async submit() {
    this.submitted = true;

    for (let i = 0; i < this.index; i += 1) {
      const input = this.tests[i].input;
      const output = this.tests[i].output;
      if (input && output) {
        (await this.fileUploadService.postTest(input, output, this.problem)).subscribe(data => {

        }, error => {
          console.log(error);
        });
      }
    }

    this.result = true;
  }

  onProblemSelected(problemTitle: string) {
    this.problem = problemTitle;
  }
}
