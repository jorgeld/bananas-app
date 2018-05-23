import { TestBed, inject } from '@angular/core/testing';

import { AmistososService } from './amistosos.service';

describe('AmistososService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmistososService]
    });
  });

  it('should be created', inject([AmistososService], (service: AmistososService) => {
    expect(service).toBeTruthy();
  }));
});
