import { Injectable } from '@angular/core';
import {AllContact} from "../contact/response/all-chat.response";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url: string = "http://localhost:8080";
  constructor(
    private http: HttpClient
  ) { }

  getLastMessageInfo(chatId : string) : Promise<AllContact | null>{
    return new Promise<AllContact | null>((resolve) => {
      this.http.get<AllContact>(this.url + '/messages/' + chatId + '/last').subscribe({
        next: (contact: AllContact) => {
          resolve(contact);
        },
        error: (err) => {
          resolve(null);
        }
      })
    })
  }

  getMessageCount(chatId : string) : Promise<number> {
    return new Promise<number>((resolve) => {
      this.http.get<number>(this.url + '/messages/' + chatId + '/amount').subscribe({
        next : (number: number) => {
          resolve(number);
        },
        error: (err) => {
          resolve(0);
        }
      })
    })
  }
}
