import {afterNextRender, afterRender, Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  accessToken: WritableSignal<string> = signal("");
  isReady: Promise<void>;

  constructor() {
    this.isReady = new Promise<void>(resolve => {
      afterNextRender(() => {
        if (this.accessToken() !== ''){
          localStorage.setItem('access_token', this.accessToken());
          return;
        }
        this.accessToken.set(localStorage.getItem('access_token') || '');
        resolve();
      });
    });
    afterRender(() => {
      if (this.accessToken() !== ''){
        localStorage.setItem('access_token', this.accessToken());
        return;
      }
      this.accessToken.set(localStorage.getItem('access_token') || '');
    });
  }

  getAccessToken(): string {
    return this.accessToken();
  }

  saveAccessToken(token: string): void {
    this.accessToken.set(token);
  }
}
