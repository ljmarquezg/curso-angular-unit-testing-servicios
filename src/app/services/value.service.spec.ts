import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValueService
      ]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('test for setValue', () => {
    it('should set value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('new value');
      expect(service.getValue()).toBe('new value');
    });
  });

  describe('test for Promise', () => {
    it('should get value promise with then', (doneFn) => {
      service.getPromiseValue()
        .then(value => {
          expect(value).toBe('value');
          doneFn();
        });
    });

    it('should get value from async', async () => {
      const response = await service.getPromiseValue()
      expect(response).toBe('value');
    });
  });

  describe('test for Observable', () => {
    it('should return value with doneFn', (doneFn) => {
      service.getObservableValue().subscribe(value => {
        expect(value).toBe('value');
        doneFn();
      });
    });

    it('should return value', () => {
      let response: string = '';
      service.getObservableValue().subscribe(value => {
        response = value;
      });
      expect(response).toBe('value');
    });
  });
});
