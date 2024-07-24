import {afterRender, Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  accessToken: WritableSignal<string> = signal("");

  constructor() {
    afterRender(() => {
      if (this.accessToken() !== ''){
        localStorage.setItem('access_token', this.accessToken());
        return;
      }
      this.accessToken.set(localStorage.getItem('access_token') || '');
    })
  }

  getAccessToken(): string {
    return this.accessToken();
  }

  saveAccessToken(token: string): void {
    this.accessToken.set(token);
  }
}
