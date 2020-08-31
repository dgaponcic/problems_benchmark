/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BenchmarkResultComponent } from './benchmark-result.component';

describe('BenchmarkResultComponent', () => {
  let component: BenchmarkResultComponent;
  let fixture: ComponentFixture<BenchmarkResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenchmarkResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenchmarkResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
