import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/user.service';
import { MyValidators } from '../../../../utils/validators';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  status: 'init' | 'loading' | 'success' | 'error' = 'init';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
        checkTerms: [false, [Validators.requiredTrue]],
      },
      {
        validators: MyValidators.matchPasswords,
      }
    );
  }

  ngOnInit(): void {
  }

  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.status = 'loading';
      const value = this.form.value;
      this.usersService.create(value)
        .subscribe({
          next: (rta) => {
            console.log(rta);
            // redirect
            this.status = 'success';
          },
          error: (err) => {
            console.log(err);
            this.status = 'error';
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get confirmPasswordField() {
    return this.form.get('confirmPassword');
  }

  get checkTermsField() {
    return this.form.get('checkTerms');
  }
}
