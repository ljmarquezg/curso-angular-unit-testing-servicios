import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueFakeService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;

  it('should be created', () => {
    const valueService = new ValueService();
    masterService = new MasterService(valueService);
    expect(masterService).toBeTruthy();
  });

  it('should return "other value" from fake-service', () => {
    const valueFakeService = new ValueFakeService();
    masterService = new MasterService(valueFakeService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "fake from object" from object', () => {
    const fake = { getValue: () => 'fake from object' };
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from object');
  });

  it('should call getValue from ValueService', () => {
    const valueService: jasmine.SpyObj<ValueService> = jasmine.createSpyObj('ValueService', ['getValue']);
    valueService.getValue.and.returnValue('fake from spy');
    masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('fake from spy');
    expect(valueService.getValue).toHaveBeenCalled();
    expect(valueService.getValue).toHaveBeenCalledTimes(1);
  });
});
