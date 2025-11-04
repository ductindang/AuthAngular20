import { TestBed } from '@angular/core/testing';

import { ResetPassswordFlow } from './reset-passsword-flow';

describe('ResetPassswordFlow', () => {
  let service: ResetPassswordFlow;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPassswordFlow);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
