import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SendMessageRequest} from "./request/send-message.request";
import {MessageResponse} from "./response/message.response";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url: string = "http://localhost:8080/api/v1/messages";

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(request: SendMessageRequest): Promise<MessageResponse | null> {
    return new Promise<MessageResponse | null>((resolve) => {
      this.http.post<MessageResponse>(this.url, request).subscribe({
        next: (message: MessageResponse) => {
          console.trace(message);
          resolve(message);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      });
    });
  }

  getLastMessage(chatId: string): Promise<MessageResponse | null> {
    return new Promise<MessageResponse | null>((resolve) => {
      this.http.get<MessageResponse>(this.url + "/" + chatId + "/last").subscribe({
        next: (message: MessageResponse) => {
          console.trace(message);
          resolve(message);
        },
        error: (err) => {
          console.trace(err);
          resolve(null);
        }
      });
    });
  }

  getAmountOfUnreadMessages(chatId: string): Promise<number> {
    return new Promise<number>((resolve) => {
      this.http.get<number>(this.url + "/" + chatId + "/amount").subscribe({
        next: (amount: number) => {
          console.trace(amount);
          resolve(amount);
        },
        error: (err) => {
          console.trace(err);
          resolve(0);
        }
      });
    });
  }

  getMessages(chatId: string): Promise<MessageResponse[]> {
    return new Promise<MessageResponse[]>((resolve) => {
      this.http.get<MessageResponse[]>(this.url + "/" + chatId).subscribe({
        next: (messages: MessageResponse[]) => {
          messages.forEach(message => console.trace(message));
          resolve(messages);
        },
        error: (err) => {
          console.trace(err);
          resolve([]);
        }
      });
    });
  }
}
