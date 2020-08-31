import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

import { AppComponent } from './app.component';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BenchmarkComponent } from './benchmark/benchmark.component';
import { BenchmarkResultComponent } from './benchmark-result/benchmark-result.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemComponent } from './problem/problem.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminTestsComponent } from './admin-tests/admin-tests.component';
import { AdminProblemsComponent } from './admin-problems/admin-problems.component';
import { SearchProblemsComponent } from './search-problems/search-problems.component';


const appRoutes: Routes = [
   { path: '', component: ProblemsComponent, canActivate: [AuthGuard] },
   { path: 'benchmark', component: BenchmarkComponent },
   { path: 'add/problem', component: AdminProblemsComponent },
   { path: 'add/tests', component: AdminTestsComponent },
   { path: 'problems', component: ProblemsComponent },
   { path: 'problem/:id', component: ProblemComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: '**', component: NotFoundComponent },
];

@NgModule({
   declarations: [
      AppComponent,
      BenchmarkComponent,
      BenchmarkResultComponent,
      ProblemsComponent,
      ProblemComponent,
      LoginComponent,
      RegisterComponent,
      AdminTestsComponent,
      AdminProblemsComponent,
      SearchProblemsComponent,
   ],
   imports: [
      MatButtonModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatSliderModule,
      MatIconModule,
      MatTableModule,
      BrowserModule,
      HttpClientModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatProgressBarModule,
      MatSelectModule,
      MatAutocompleteModule,
      RouterModule.forRoot(
         appRoutes,
         { enableTracing: false },
      ),
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
