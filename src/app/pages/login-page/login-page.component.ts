import { Component } from '@angular/core';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {merge, pipe, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {ErrorMessageHandler} from "../../utility/error-message.handler";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormField,
    MatCheckbox,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatAnchor,
    MatButton,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
    MatIconButton,
    MatIcon,
    NgIf,
    MatError,
    RouterLink
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})





export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }
  );
  loginErrorHandlers: LoginErrorHandlers = {
    email: new ErrorMessageHandler('Введіть пошту', 'Недійсна пошта', 'Неправильна пошта або пароль'),
    password: new ErrorMessageHandler('Введіть пароль', '', 'Неправильна пошта або пароль')
  };
  hidePassword: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
    const {email, password} = this.loginForm.controls;
    merge(email.statusChanges, email.valueChanges, email.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.loginErrorHandlers.email.updateErrorMessage(email));
    merge(password.statusChanges, password.valueChanges, email.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.loginErrorHandlers.password.updateErrorMessage(password));
  }

  clickEvent(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  onSubmit() {
    const {email, password} = this.loginForm.controls;
    this.authenticationService.authenticate({
      email: email.value,
      password: password.value
    }).then(login => {
      if (login) {
        this.router.navigate(['']);
      }
    });
  }

  setInputErrors(): void {
    const {email} = this.loginForm.controls;
    email.setErrors({invalidCredentials: true});
    merge(email.valueChanges)
      .pipe(take(1))
      .subscribe(() => email.setErrors(null));
  }

}

interface LoginErrorHandlers {
  email: ErrorMessageHandler;
  password: ErrorMessageHandler;
}
