/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProblemsService } from './problems.service';

describe('Service: Problems', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemsService]
    });
  });

  it('should ...', inject([ProblemsService], (service: ProblemsService) => {
    expect(service).toBeTruthy();
  }));
});
