import { TestBed } from '@angular/core/testing';
import {Calculator} from './calculator';

describe('Calculator', () => {
  it('#add should return 3', () => {
    //Assert
    const calculator = new Calculator();
    //Act
    const result = calculator.add(1, 2);
    //Assert
    expect(result).toBe(3);
  });

  it('#multiply should return 9', () => {
    //Assert
    const calculator = new Calculator();
    //Act
    const result = calculator.multiply(3, 3);
    //Assert
    expect(result).toBe(9);
  });

  it('#divide should return numbers', () => {
    //Assert
    const calculator = new Calculator();
    //Act & Assert
    expect(calculator.divide(3, 3)).toBe(1);
    expect(calculator.divide(6, 3)).toBe(2);
  });

  it('test matchers', () => {
    let name = 'Nicolas';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 2 === 4).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(5).toBeLessThanOrEqual(5);
    expect(5).toBeGreaterThan(2);
    expect(5).toBeGreaterThanOrEqual(5);

    expect('1234567').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  })

})