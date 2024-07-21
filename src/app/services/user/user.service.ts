import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterUserRequest} from "./request/register-user.request";
import {RegisterUserResponse} from "./response/register-user.response";
import {LoginUserRequest} from "./request/login-user.request";
import {User} from "./user.entity";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  user?: User;
  url: string = "http://localhost:8080/users";

  constructor(
    private http: HttpClient
  ) {
    this.getUser();
    // TODO зробити оновлення користувача кожну хвилину
  }

  /**
   * Повертає {@link RegisterUserResponse} якщо реєстрація відбулася успішно
   * і null якщо виникла помилка
   * @param request
   */
  registerNewUser(request: RegisterUserRequest): Promise<RegisterUserResponse | null> {
    return new Promise<RegisterUserResponse | null>((resolve) => {
      this.http.post<RegisterUserResponse>(this.url + '/register', request).subscribe({
        next: (response: RegisterUserResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null)
        }
      })
    })
  }

  /**
   * Повертає true якщо логін пройшов успішно і false якщо пошта і пароль
   * неправильні
   * @param request
   */
  loginUser(request: LoginUserRequest): Promise<boolean> {
    return new Promise((resolve) => {
      // TODO зробити реалізацію логіну
      resolve(true);
    });
  }

  /**
   * Повертає аунтентифікованого користувача.
   * Може повернути undefined якщо користувач
   * не залогінений
   */
  getCurrentUser(): User | undefined {
    return this.user;
  }

  private getUser(): void {
    this.user = {
      id: "9e17a060-da17-4916-ab16-66ec04b5eaf0",
      username: "admin",
      email: "admin@admin.com",
      firstname: "admin",
      lastname: "adminovich",
      status: "ONLINE"
    };
  }
}
