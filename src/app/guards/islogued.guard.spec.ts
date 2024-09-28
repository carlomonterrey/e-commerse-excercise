import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isloguedGuard } from './islogued.guard';

describe('isloguedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isloguedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
