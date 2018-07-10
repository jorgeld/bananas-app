import { TestBed, inject } from '@angular/core/testing';

import { TorneosService } from './torneos.service';

describe('TorneosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorneosService]
    });
  });

  it('should be created', inject([TorneosService], (service: TorneosService) => {
    expect(service).toBeTruthy();
  }));
});
