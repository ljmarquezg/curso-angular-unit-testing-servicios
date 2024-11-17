import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { asyncData, clickElement, clickEvent, getText, mockObservable, query, queryByDirective, queryById, setCheckboxValue, setInputValue } from '../../../../../testing';
import { generateOneUser } from '../../../../models/user.mock';
import { UsersService } from '../../../../services/user.service';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  let nameField: AbstractControl | null;
  let lastnameField: AbstractControl | null;
  let emailField: AbstractControl | null;
  let passwordField: AbstractControl | null;
  let confirmField: AbstractControl | null;
  let checkTermsField: AbstractControl | null;

  beforeEach(async () => {
    const spyUserService = jasmine.createSpyObj('UsersService', ['create']);
    await TestBed.configureTestingModule({
        imports: [
          RegisterFormComponent,
          ReactiveFormsModule
        ],
        providers: [
          {
            provide: UsersService,
            useValue: spyUserService
          },
        ]
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    nameField = component.nameField;
    lastnameField = component.lastNameField;
    emailField = component.emailField;
    passwordField = component.passwordField;
    confirmField = component.confirmPasswordField;
    checkTermsField = component.checkTermsField;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('First Name', () => {
    it('should validate First Name to be invalid if empty', () => {
      nameField?.setValue('');
      expect(nameField?.invalid).withContext('empty field').toBeTrue();
    });

    it('should validate First Name to be valid if not empty', () => {
      nameField?.setValue('test');
      expect(nameField?.valid).withContext('valid name').toBeTrue();
    });
  });

  describe('Password & Confirm Password', () => {
    it('should validate Password to be invalid if empty', () => {
      passwordField?.setValue('');
      expect(passwordField?.invalid).withContext('empty field').toBeTrue();
    });

    it('should validate Confirm Password to be invalid if empty', () => {
      confirmField?.setValue('');
      expect(confirmField?.invalid).withContext('empty field').toBeTrue();
    });

    it('should validate Password to be invalid if has less than 6 characters', () => {
      passwordField?.setValue('12345');
      expect(passwordField?.invalid).withContext('less than 6 characters').toBeTrue();
    });

    it('should validate Confirm Password to be invalid if has less than 6 characters', () => {
      confirmField?.setValue('12345');
      expect(confirmField?.invalid).withContext('less than 6 characters').toBeTrue();
    });

    it('should validate Password to be invalid if does not includes a number', () => {
      passwordField?.setValue('abcdef');
      expect(passwordField?.invalid).withContext('missing number').toBeTrue();
    });

    it('should validate Confirm Password to be invalid if does not includes a number', () => {
      confirmField?.setValue('abcdef');
      expect(confirmField?.invalid).withContext('missing number').toBeTrue();
    });

    it('should validate Password to be valid', () => {
      passwordField?.setValue('abc1def');
      expect(passwordField?.valid).withContext('valid').toBeTrue();
    });

    it('should validate Confirm Password to be valid', () => {
      confirmField?.setValue('123456');
      expect(confirmField?.valid).withContext('valid').toBeTrue();
    });

  });

  describe('Check Terms', () => {
    it('should validate Check Terms to be invalid if not checked', () => {
      checkTermsField?.setValue(false);
      expect(checkTermsField?.invalid).withContext('not checked').toBeTrue();
    });

    it('should validate Check Terms to be valid if checked', () => {
      checkTermsField?.setValue(true);
      expect(checkTermsField?.valid).withContext('checked').toBeTrue();
    });
  });

  describe('Form', () => {
    beforeEach(() => {
      component?.form?.patchValue({
        name: 'name',
        lastName: 'last name',
        email: 'test@test.com',
        password: 'abcdef',
        confirmPassword: 'abcdef',
        checkTerms: true
      });
    });

    it('should validate form to be invalid if any field is invalid', () => {
      expect(component?.form?.invalid).withContext('invalid form').toBeTrue();
    });

    it('should validate form to be invalid if any field are valid and passwords don\'t match', () => {
      component?.form?.patchValue({
        password: '123456a',
        confirmPassword: '123456',
      });

      expect(component?.form?.invalid).withContext('valid form').toBeTrue();
    });

    it('should validate form to be valid if any field are valid and passwords match', () => {
      component?.form?.patchValue({
        password: '123456',
        confirmPassword: '123456',
      });

      expect(component?.form?.valid).withContext('valid form').toBeTrue();
    });
  });

  describe('UI test', () => {
    it('should validate email field to be invalid if wrong format', () => {
      const emailDe = query(fixture, 'input#email');
      const emailInput: HTMLInputElement = emailDe.nativeElement;
      emailInput.value = 'test.com';

      emailInput.dispatchEvent(new Event('input'));
      emailInput.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(emailField?.invalid).withContext('invalid email').toBeTrue();
      expect(getText(fixture, 'email-format-error')).toContain('*It\'s not a email');
    });

    it('should validate email field to be invalid if wrong format with setInputValue', () => {
      setInputValue(fixture, 'input#email', 'esto no es un correo');
      fixture.detectChanges();
      expect(emailField?.invalid).withContext('invalid email').toBeTrue();
      expect(getText(fixture, 'email-format-error')).toContain('*It\'s not a email');
    });

    it('should call create User on submit', () => {
      component?.form?.patchValue({
        name: 'name',
        lastName: 'last name',
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456',
        checkTerms: true
      });
      const mockUser = generateOneUser();
      userService.create.and.returnValue(mockObservable(mockUser));
      component.register(new Event('submit'));
      fixture.detectChanges();
      expect(component?.form?.valid).withContext('valid form').toBeTrue();
      expect(userService.create).toHaveBeenCalled();
    });

    it('should call create User on submit and evaluate status from loading => success', fakeAsync(() => {
        component?.form?.patchValue({
          name: 'name',
          lastName: 'last name',
          email: 'test@test.com',
          password: '123456',
          confirmPassword: '123456',
          checkTerms: true
        });
        const mockUser = generateOneUser();
        userService.create.and.returnValue(asyncData(mockUser));
        component.register(new Event('submit'));
        fixture.detectChanges();
        expect(component.status).toBe('loading');
        tick();
        fixture.detectChanges();
        expect(component?.form?.valid).withContext('valid form').toBeTrue();
        expect(userService.create).toHaveBeenCalled();
        expect(component.status).toBe('success');
      })
    );

    it('should call create User on submit and evaluate status from loading => success', fakeAsync(() => {
        component?.form?.patchValue({
          name: 'name',
          lastName: 'last name',
          email: 'test@test.com',
          password: '123456',
          confirmPassword: '123456',
          checkTerms: true
        });
        const mockUser = generateOneUser();
        userService.create.and.returnValue(asyncData(mockUser));
        component.register(new Event('submit'));
        fixture.detectChanges();
        expect(component.status).toBe('loading');
        tick();
        fixture.detectChanges();
        expect(component?.form?.valid).withContext('valid form').toBeTrue();
        expect(userService.create).toHaveBeenCalled();
        expect(component.status).toBe('success');
      })
    );

    it('should fill User form and submit ', fakeAsync(() => {
      const mockUser = generateOneUser();
      userService.create.and.returnValue(asyncData(mockUser));
        setInputValue(fixture, 'input#name', 'name');
        setInputValue(fixture, 'input#email', 'test@test.com');
        setInputValue(fixture, 'input#password', '123456');
        setInputValue(fixture, 'input#confirmPassword', '123456');
        setCheckboxValue(fixture, 'input#checkTerms', true);
        fixture.detectChanges();
        const registerButton: DebugElement = queryById(fixture, 'register-button');
        expect(registerButton.nativeElement.disabled).toBe(false);
        clickElement(fixture, 'register-button', true);
        expect(component.status).toBe('loading');
        tick();
        fixture.detectChanges();
        expect(component?.form?.valid).withContext('valid form').toBeTrue();
        expect(userService.create).toHaveBeenCalled();
        expect(component.status).toBe('success');
      })
    );
  });
});
