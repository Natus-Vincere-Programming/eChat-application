import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import {Client, Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class StompClientService {

  private socket: WebSocket = new SockJS('http://localhost:8080/ws');
  private _client: Client = Stomp.over(this.socket);

  constructor(
  ) {}


  get client(): Client {
    return this._client;
  }

  activateClient(): void {
    this._client.activate();
  }
}
