import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/problems']);
    }
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        console.log(data);
        console.log(localStorage.getItem('currentUser'));
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loading = false;
      });
  }
}
