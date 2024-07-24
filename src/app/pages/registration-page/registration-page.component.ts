import {Component} from '@angular/core';
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgIf} from "@angular/common";
import {ErrorMessageHandler} from "../../utility/error-message.handler";
import {UserService} from "../../services/user/user.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";

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
      nickname: new FormControl(
        "",
        [Validators.required, Validators.pattern('[a-zA-Z1-9]*')]
      ),
      firstname: new FormControl(
        "",
        [Validators.required, Validators.minLength(2)]
      ),
      lastname: new FormControl(
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
    firstname: new ErrorMessageHandler('Введіть ім\'я', '', 'Нікнейм може включати лише латинські букви'),
    lastname: new ErrorMessageHandler('Введіть прізвище'),
    password: new ErrorMessageHandler('Введіть пароль', '', 'Пароль повинен містити принаймні 8 символів'),
    confirmPassword: new ErrorMessageHandler('Повторіть пароль', '', 'Паролі не співпадають'),
    nickname: new ErrorMessageHandler('Введіть нікнейм', '', 'Нікнейм може містити лише латинські букви')
  };
  hidePassword: boolean = true;
  hideAgainPassword: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    const nickNameControl = this.registerForm.get('nickname');
    const emailControl = this.registerForm.get('email');
    const firstNameControl = this.registerForm.get('firstname');
    const surNameControl = this.registerForm.get('lastname');
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword')
    if (emailControl && nickNameControl && firstNameControl && surNameControl && passwordControl && confirmPasswordControl) {
      merge(emailControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.email.updateErrorMessage(emailControl));
      merge(firstNameControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.firstname.updateErrorMessage(firstNameControl));
      merge(surNameControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.lastname.updateErrorMessage(surNameControl));
      merge(passwordControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.password.updateErrorMessage(passwordControl));
      merge(nickNameControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.nickname.updateErrorMessage(nickNameControl));
      merge(confirmPasswordControl.events)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.errorHandlers.confirmPassword.updateErrorMessage(confirmPasswordControl));
    } else {
      throw new Error('Form controls are not initialized');
    }
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const {nickname, firstname, lastname, email, password} = this.registerForm.controls;
    this.authenticationService.register({
      username: nickname.value,
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value
    }).then(id => {
        if (id) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login'])
        }
      }
    );
    // TODO navigate to verification page
  }

  clickEvent(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

}

interface RegisterErrorHandlers {
  email: ErrorMessageHandler;
  firstname: ErrorMessageHandler;
  lastname: ErrorMessageHandler;
  password: ErrorMessageHandler;
  nickname: ErrorMessageHandler;
  confirmPassword: ErrorMessageHandler;
}
