import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequest} from "./request/authentication.request";
import {AuthenticationResponse} from "./response/authentication.response";
import {JwtService} from "../jwt/jwt.service";

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

  authenticate(request: AuthenticationRequest): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.http.post<AuthenticationResponse>(this.url + '/authenticate', request).subscribe({
        next: (response: AuthenticationResponse) => {
          this.jwtService.saveAccessToken(response.access_token);
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
