import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserResponse} from "./response/user.response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:8080/api/v1/users";

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Знаходить користувача по id
   * @param id
   */
  getById(id: string): Promise<UserResponse | null> {
    return new Promise<UserResponse | null>((resolve) => {
      this.http.get<UserResponse>(this.url + "/" + id).subscribe({
        next: (user: UserResponse) => {
          console.trace(user);
          resolve(user);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      })
    });
  }

  /**
   * Знаходить інформацію про користувача
   * який залігений в системі
   */
  getAuthenticated(): Promise<UserResponse | null> {
    return new Promise<UserResponse | null>((resolve) => {
      this.http.get<UserResponse>(this.url + "/info").subscribe({
        next: (user: UserResponse) => {
          console.trace(user);
          resolve(user);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      })
    });
  }

  /**
   * Знаходить користувача по username
   * @param username
   */
  findByUsername(username: string): Promise<UserResponse | null> {
    return new Promise<UserResponse | null>((resolve) => {
      this.http.get<UserResponse>(this.url + "/search", {
        params: {username: username}
      }).subscribe({
        next: (user: UserResponse) => {
          console.trace(user);
          resolve(user);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      });
    });
  }
}
