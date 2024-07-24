import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {MessageComponent} from "./message/message.component";
import {EmailVerificationPageComponent} from "./pages/email-verification-page/email-verification-page.component";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {JwtService} from "./services/jwt/jwt.service";
import {UserService} from "./services/user/user.service";
import {ContactService} from "./services/contact/contact.service";
import {ChatService} from "./services/chat/chat.service";
import {RedirectService} from "./services/redirect/redirect.service";
import {NgIf} from "@angular/common";
import {MessageService} from "./services/message/message.service";
import {StompClientService} from "./services/stomp-client.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,
    MainPageComponent,
    EmailVerificationPageComponent,
    MessageComponent, NgIf]
})
export class AppComponent implements OnInit {
  readyToRender: boolean = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private userService: UserService,
    private contactService: ContactService,
    private chatService: ChatService,
    private redirectService: RedirectService,
    private messageService: MessageService,
    private stompService: StompClientService
  ) {
  }

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
    this.jwtService.isReady.then(() => {
      this.redirectService.checkAuthorization().then(() => {
        this.readyToRender = true;
      });
    });
  }
}
