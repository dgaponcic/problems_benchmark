import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService, TestResult } from '../_services/fileUpload.service';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.css']
})
export class BenchmarkComponent implements OnInit {
  @Input() id: string;

  fileToUpload: File = null;
  result: TestResult;
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  async handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    await this.uploadFileToActivity();
  }

  resetFileHTML() {
    (document.getElementById('file-input') as HTMLInputElement).value = null;
  }

  async uploadFileToActivity() {
    const extension = this.fileToUpload.name.split('.').pop();
    (await this.fileUploadService.postFile(this.fileToUpload, extension, this.id)).subscribe(data => {
      this.result = JSON.parse(JSON.stringify(data.result));
      this.resetFileHTML();
    }, error => {
      console.log(error);
    });
  }

}
