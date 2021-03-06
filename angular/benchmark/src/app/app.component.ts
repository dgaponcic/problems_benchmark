import { Component } from '@angular/core';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'benchmark';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  isAuth() {
    return this.authenticationService.isAuth();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isAllowed() {
    // let type: string;
    // this.authenticationService.getType().subscribe(
    //   res => {
    //     type = res.type;
    //   });
    // console.log(type)
    return this.currentUser.role === 'supervisor';
  }
}
