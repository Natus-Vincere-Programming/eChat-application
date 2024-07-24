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

  activateChatUpdate() {
    let currentUser = this.userService.getCurrentUser();
    if (currentUser){
      this.client.subscribe('/user/' + currentUser.id + '/queue/chats', chat => {
        this.addChat(JSON.parse(chat.body));
      });
    } else console.log('User is not logged in and cannot activate chat update');
  }

  private addChat(chat: Chat) {
    this.chats.push(chat);
  }
}
