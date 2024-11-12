import { TestBed } from '@angular/core/testing';
import { Person } from './person.model';

describe('Test for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('John', 'Doe', 30, 81, 1.72);

    TestBed.configureTestingModule({

    });
  });

  it('should create a person', () => {
    expect(person).toBeTruthy();
  });

  it('attrs', () => {
    expect(person.name).toBe('John');
    expect(person.lastName).toBe('Doe');
    expect(person.age).toBe(30);
    expect(person.weight).toBe(81);
    expect(person.height).toBe(1.72);
  });

  describe('calcBMI', () => {
    it('should return a string: Underweight', () => {
      //Arrange
      person.weight = 40;
      person.height = 1.65;
      // Act
      const result = person.calcIMC();
      //Assert
      expect(result).toBe('Underweight');
    });

    it('should return a string: Normal weight', () => {
      //Arrange
      person.weight = 60;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      //Assert
      expect(result).toBe('Normal weight');
    });

    it('should return a string: Overweight level 1', () => {
      //Arrange
      person.weight = 80;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      //Assert
      expect(result).toBe('Overweight level 1');
    });

    it('should return a string: Overweight level 2', () => {
      //Arrange
      person.weight = 88;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      //Assert
      expect(result).toBe('Overweight level 2');
    });

    it('should return a string: Overweight level 3', () => {
      //Arrange
      person.weight = 120;
      person.height = 1.72;
      // Act
      const result = person.calcIMC();
      //Assert
      expect(result).toBe('Overweight level 3');
    });

    it('should return a string: Invalid value if 0', () => {
      //Arrange
      person.weight = 0;
      person.height = 0;
      // Act
      const result = person.calcIMC();
      //Assert
      expect(result).toBe('Invalid value');
    })

    it('should return a string: Invalid value if negative', () => {
      //Arrange
      person.weight = -50;
      person.height = 0;
      // Act
      const result = person.calcIMC();
      //Assert
      expect(result).toBe('Invalid value');
    })

  });
});