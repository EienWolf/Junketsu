import { TestBed } from '@angular/core/testing';

import { AttireService } from './attire.service';

describe('AttireService', () => {
  let service: AttireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
