import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueFakeService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
   const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {
          provide: ValueService,
          useValue: spy
        },
      ]
    });

    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

 /* it('should return "other value" from fake-service', () => {
    const valueFakeService = new ValueFakeService();
    masterService = new MasterService(valueFakeService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "fake from object" from object', () => {
    const fake = { getValue: () => 'fake from object' };
    masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from object');
  });*/

  it('should call getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake from spy');
    expect(masterService.getValue()).toBe('fake from spy');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});