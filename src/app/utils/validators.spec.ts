import { FormControl, FormGroup } from '@angular/forms';
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
});