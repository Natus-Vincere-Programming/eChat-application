import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginUserRequest} from "./request/login-user.request";
import {User} from "./user.entity";
import {UUID} from "node:crypto";
import {RegisterUserRequest} from "./request/register-user.request";
import {RegisterUserResponse} from "./response/register-user.response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: User;
  url: string = "http://localhost:8080/users";

  constructor(
    private http: HttpClient
  ) {
    this.startUpdateUser().then(() => console.log('User update started'));
  }

  registerUser(request: RegisterUserRequest) {
    return new Promise<RegisterUserResponse | null>(resolve => {
      this.http.post<RegisterUserResponse>(this.url+"/register", request).subscribe({
        next: (response: RegisterUserResponse) => {
          resolve(response)
        },
        error: (error: HttpErrorResponse) => {
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
    const encode = (str: string):string => btoa(unescape(encodeURIComponent(str)));
    return new Promise<boolean>((resolve) => {
      this.http.post<User>('http://localhost:8080/login', null, {
        headers: {
          'Authorization': "Basic " + encode(request.email + ":" + request.password)
        }
      }).subscribe({
        next: (user: User) => {
          this.user = user;
          resolve(true);
        },
        error: (err) => {
          console.log(err);
          resolve(false);
        }
      });
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

  /**
   * Знаходить користувача по id
   * @param id
   */
  getUserById(id: UUID): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      this.http.get<User>(this.url + "/" + id).subscribe({
        next: (user: User) => {
          resolve(user);
        },
        error: (err) => {
          resolve(null);
        }
      })
    });
  }

  private getUser(): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      this.http.get<User>(this.url + "/info").subscribe({
        next: (user: User) => {
          resolve(user);
        },
        error: (err) => {
          resolve(null);
        }
      })
    });
  }

  private async startUpdateUser() {
    // setInterval(() => {
    //   this.getUser().then(user => {
    //     if (user == null) return;
    //     this.user = user;
    //   });
    // }, 60000);
  }
}
