import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import SockJS from "sockjs-client";
import {Client, Stomp} from "@stomp/stompjs";
import {Chat} from "./chat.entity";
import {StompClientService} from "../stomp-client.service";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url: string = "http://localhost:8080/chats";
  chats: Chat[] = [];
  client: Client;

  constructor(
    private http: HttpClient,
    private stompClient: StompClientService,
    private userService: UserService
  ) {
    this.client = stompClient.client;
  }


  async addChats(): Promise<void> {
    this.http.get<Chat[]>(this.url).subscribe({
      next: (response: Chat[]) => {
        this.chats = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private addChat(chat: Chat) {
    this.chats.push(chat);
  }
}
