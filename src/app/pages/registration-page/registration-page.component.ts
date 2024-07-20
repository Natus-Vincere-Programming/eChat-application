import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validator, ValidatorFn,
  Validators
} from "@angular/forms";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {merge, pipe, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgIf} from "@angular/common";
import {ErrorMessageHandler} from "../../utility/error-message.handler";

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatAnchor,
    RouterLink,
    MatButton,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatError,
    NgIf
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})


export class RegistrationPageComponent {
  registerForm: FormGroup = new FormGroup(
    {
      nickName: new FormControl(
        "",
        [Validators.required]
      ),
      name: new FormControl(
        "",
        [Validators.required, Validators.minLength(2)]
      ),
      surName: new FormControl(
        "",
        [Validators.required, Validators.minLength(2)]
      ),
      email: new FormControl("",
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        "", [Validators.required, Validators.minLength(8)]
      ),
      confirmPassword: new FormControl(
        "",
        [Validators.required, Validators.minLength(8)]
      )
    }
  );
  errorHandlers: RegisterErrorHandlers = {
    email: new ErrorMessageHandler('Введіть пошту', 'Недійсна пошта', 'Ця пошта уже зайнята'),
    firstName: new ErrorMessageHandler('Введіть ім\'я', '', 'Нікнейм може включати лише латинські букви'),
    surName: new ErrorMessageHandler('Введіть прізвище'),
    password: new ErrorMessageHandler('Введіть пароль', '', 'Пароль повинен містити принаймні 8 символів'),
    confirmPassword: new ErrorMessageHandler('Повторіть пароль', '', 'Паролі не співпадають'),
    nickName: new ErrorMessageHandler('Введіть нікнейм', '', 'Нікнейм може містити лише латинські букви')
  };
  hidePassword: boolean = true;
  hideAgainPassword: boolean = true;

  constructor(
    private router: Router,
  ) {
    const nickNameControl = this.registerForm.get('nickName');
    const emailControl = this.registerForm.get('email');
    const firstNameControl = this.registerForm.get('name');
    const surNameControl = this.registerForm.get('surName');
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword')
    if (emailControl && nickNameControl && firstNameControl && surNameControl && passwordControl && confirmPasswordControl) {
      merge(emailControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.email.updateErrorMessage(emailControl));
      merge(firstNameControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.firstName.updateErrorMessage(firstNameControl));
      merge(surNameControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.surName.updateErrorMessage(surNameControl));
      merge(passwordControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.password.updateErrorMessage(passwordControl));
      merge(nickNameControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.nickName.updateErrorMessage(nickNameControl));
      merge(confirmPasswordControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.confirmPassword.updateErrorMessage(confirmPasswordControl));
    } else {
      throw new Error('Form controls are not initialized');
    }
  }


  clickEvent(event : MouseEvent){
    this.hidePassword = !this.hidePassword;
    this.hideAgainPassword = !this.hideAgainPassword;
    event.stopPropagation();
  }

}

interface RegisterErrorHandlers {
  email: ErrorMessageHandler;
  firstName: ErrorMessageHandler;
  surName: ErrorMessageHandler;
  password: ErrorMessageHandler;
  nickName: ErrorMessageHandler;
  confirmPassword: ErrorMessageHandler;
}
