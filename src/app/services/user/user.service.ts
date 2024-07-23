import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginUserRequest} from "./request/login-user.request";
import {User} from "./user.entity";
import {UUID} from "node:crypto";
import {RegisterRequest} from "../authentication/request/register.request";
import {RegisterResponse} from "../authentication/response/register.response";
import {resolve} from "node:path";

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
