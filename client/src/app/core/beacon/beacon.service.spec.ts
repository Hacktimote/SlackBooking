import { TestBed, inject } from '@angular/core/testing';

import { BeaconService } from './beacon.service';

describe('BeaconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeaconService]
    });
  });

  it('should be created', inject([BeaconService], (service: BeaconService) => {
    expect(service).toBeTruthy();
  }));
});
