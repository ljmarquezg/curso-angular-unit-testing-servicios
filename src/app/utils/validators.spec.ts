import { FormControl, FormGroup } from '@angular/forms';
import { mockObservable } from '../../testing';
import { UsersService } from '../services/user.service';
import { MyValidators } from './validators';

describe('Validators', () => {
  describe('validPassword', () => {
    it('should return null when password is valid', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('123456');
      // Act
      const result = MyValidators.validPassword(control);
      // Assert
      expect(result).toBeNull();
    });

    it('should return null when password is invalid', () => {
      // Arrange
      const control = new FormControl();
      control.setValue('abcdef');
      // Act
      const result = MyValidators.validPassword(control);
      // Assert
      expect(result?.invalid_password).toBeTrue();
    });
  });

  describe('matchPasswords', () => {
    it('should return valid', () => {
      // Arrange
      const formGroup = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456'),
      });
      // Act
      const result = MyValidators.matchPasswords(formGroup);
      // Assert
      expect(result).toBeNull();
    });

    it('should return invalid match_password error', () => {
      // Arrange
      const formGroup = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123455'),
      });
      // Act
      const result = MyValidators.matchPasswords(formGroup);
      // Assert
      expect(result?.match_password).toBeTrue();
    });

    it('should return error if missing fields', () => {
      // Arrange
      const formGroup = new FormGroup({
        errorField: new FormControl('123456'),
        confirmPassword: new FormControl('123455'),
      });
      // Act
      const fnError = () => {
        MyValidators.matchPasswords(formGroup);
      }
      // Assert
      expect(fnError).toThrow(new Error('matchPasswords: fields not found'));
    });
  });

  describe('ValidateEmailAsync', () => {
    it('should return null with a valid email', (doneFn) => {
      // Arrange
      const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('UsersService', ['isAvailableByEmail']);
      const control = new FormControl('nico@email.com');
      // Act
      userService.isAvailableByEmail.and.returnValue(mockObservable({ isAvailable: true }));
      const validator = MyValidators.validateEmailAsync(userService);
      validator(control).subscribe((result) => {
        // Assert
        expect(result).toBeNull();
        doneFn();
      });
    });

    it('should return error with a valid email', (doneFn) => {
      // Arrange
      const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('UsersService', ['isAvailableByEmail']);
      const control = new FormControl('nico@email.com');
      // Act
      userService.isAvailableByEmail.and.returnValue(mockObservable({ isAvailable: false }));
      const validator = MyValidators.validateEmailAsync(userService);
      validator(control).subscribe((result) => {
        // Assert
        expect(result).toEqual({ not_available: true });
        doneFn();
      });
    });
  });
});