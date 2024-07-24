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

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,
    MainPageComponent,
    EmailVerificationPageComponent,
    MessageComponent]
})
export class AppComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private userService: UserService,
    private contactService: ContactService,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
    this.authenticationService.authenticate({
      email: 'test@gmail.com',
      password: 'test'
    }).then(ignore => {
      this.chatService.getAllChats().then(chats => {
        console.trace("Chats " + chats);
      })
      this.userService.findByUsername("tetst1").then(user => {
        if (user === null) return;
        this.chatService.createChat({
          receiverId: user.id
        }).then(response => {
          if (response === null) {
            console.log('Chat not created');
            return;
          }
          this.chatService.getByChatId(response.chatId).then(chat => {
            console.trace("Chat by id " + chat);
          })
          this.chatService.deleteChat(response.chatId).then(ignore => {
            console.log('Chat deleted');
          });
        })
      })
    })
  }
}
