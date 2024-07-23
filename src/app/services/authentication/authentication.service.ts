import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./request/login.request";
import {LoginResponse} from "./response/login.response";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url: string = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {
  }

  loginUser(request: LoginRequest): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.post<LoginResponse>(this.url + '/authenticate', request).subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem('access_token', response.access_token);
          resolve(true);
        },
        error: (err) => {
          console.error(err);
          resolve(false);
        }
      });
    });
  }




}
