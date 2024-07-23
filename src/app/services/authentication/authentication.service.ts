import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthenticationRequest} from "./request/authentication.request";
import {AuthenticationResponse} from "./response/authentication.response";
import {JwtService} from "../jwt/jwt.service";
import {RegisterRequest} from "./request/register.request";
import {RegisterResponse} from "./response/register.response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string = 'http://localhost:8080/api/v1/auth';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {
  }

  /**
   * Логін користувача
   * @param request
   */
  authenticate(request: AuthenticationRequest): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.post<AuthenticationResponse>(this.url + '/authenticate', request).subscribe({
        next: (response: AuthenticationResponse) => {
          this.jwtService.saveAccessToken(response.access_token);
          console.debug('Access token saved and authenticated');
          console.trace('Access token ' + this.jwtService.getAccessToken());
          resolve(true);
        },
        error: (err) => {
          console.trace(err);
          resolve(false);
        }
      });
    });
  }

  /**
   * Реєстрація користувача
   * @param request
   */
  register(request: RegisterRequest): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.post<AuthenticationResponse>(this.url+ "/register", request).subscribe({
        next: (response: AuthenticationResponse) => {
          this.jwtService.saveAccessToken(response.access_token);
          console.debug('User registered successfully');
          console.trace(response);
          resolve(true)
        },
        error: (error: HttpErrorResponse) => {
          console.trace(error);
          resolve(false)
        }
      })
    })
  }

  isEmailTaken(email: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.get<boolean>(this.url + "/email?email=" + email).subscribe({
        next: (response: boolean) => {
          console.debug('Email is taken: ' + email);
          resolve(response);
        },
        error: (error: HttpErrorResponse) => {
          console.trace(error);
          resolve(true);
        }
      })
    })
  }
}
