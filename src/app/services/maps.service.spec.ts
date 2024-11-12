import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let mapsService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mapsService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapsService).toBeTruthy();
  });

  it('should get position', () => {
    //Arrange
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
      const mockGeolocation = {
        coords: {
          accuracy: 0,
          altitude: 10,
          altitudeAccuracy: 200,
          heading: 300,
          latitude: 400,
          longitude: 500,
          speed: 10,
        },
        timestamp: 0
      };
      successFn(mockGeolocation);
    });
    //Act
    mapsService.getCurrentPosition();
    //Assert
    expect(mapsService.center.lat).toBe(400);
    expect(mapsService.center.lng).toBe(500);
  });
});
