import { TestBed } from '@angular/core/testing';

import { MenssageService } from './menssage.service';

describe('MenssageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenssageService = TestBed.get(MenssageService);
    expect(service).toBeTruthy();
  });
});
