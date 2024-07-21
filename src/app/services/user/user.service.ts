import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterUserRequest} from "./request/register-user.request";
import {RegisterUserResponse} from "./response/register-user.response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:8080/users";

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Повертає {@link RegisterUserResponse} якщо реєстрація відбулася успішно
   * і null якщо виникла помилка
   * @param request
   */
  registerNewUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    return new Promise<boolean>((resolve) => {
      this.http.post(url + '/register', request).subscribe({
        next: (response: RegisterUserResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null)
        }
      })
    })
  }
}
