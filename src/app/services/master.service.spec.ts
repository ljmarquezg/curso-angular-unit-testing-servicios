import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueFakeService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;

  it('should be created', () => {
    const valueService = new ValueService();
    service = new MasterService(valueService);
    expect(service).toBeTruthy();
  });

  it('should return "other value" from fake-service', () => {
    const valueFakeService = new ValueFakeService();
    service = new MasterService(valueFakeService as unknown as ValueService);
    expect(service.getValue()).toBe('fake value');
  });

  it('should return "fake from object" from object', () => {
    const fake = { getValue: () => 'fake from object' };
    service = new MasterService(fake as ValueService);
    expect(service.getValue()).toBe('fake from object');
  });
});
