import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import {Client, Stomp} from '@stomp/stompjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: WebSocket = new SockJS('http://localhost:8080/ws');
  client: Client = Stomp.over(this.socket);

  constructor() {
    this.client.onConnect = () => this.onConnect();
    this.client.activate();
  }

  onConnect(): void {
    this.client.publish({
      destination: '/app/user.addUser',
      body: JSON.stringify({
        username: 'admin',
        email: 'admin@admin.com',
        firstname: 'admin',
        lastname: 'admin',
        status: 'ONLINE'
      })
    })
  }

  onDisconnect(): void {

  }
}
