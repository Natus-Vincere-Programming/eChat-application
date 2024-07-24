import { Injectable } from '@angular/core';
import SockJS from "sockjs-client";
import {Client, CompatClient, Stomp} from "@stomp/stompjs";
import {JwtService} from "./jwt/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class StompClientService {

  /*private socket: WebSocket = new SockJS('http://localhost:8080/ws');*/
  private _client: CompatClient = Stomp.client('http://localhost:8080/ws');

  constructor(
    private jwtService: JwtService
  ) {}


  get client(): Client {
    return this._client;
  }

  activateClient(): void {
    this._client.connect({
      Authorization: "Bearer " + this.jwtService.getAccessToken()
    }, () => {
      console.debug('Stomp client activated');
      this._client.send('/user/online', {
        Authorization: "Bearer " + this.jwtService.getAccessToken()
      })
    });
    this._client.activate();
  }
}
