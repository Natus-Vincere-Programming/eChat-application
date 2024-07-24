import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, viewChild} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {MatBadge} from "@angular/material/badge";
import {LogoutDialogComponent} from "./dialogs/logout-dialog/logout-dialog.component";
import {SettingsDialogComponent} from "./dialogs/settings-dialog/settings-dialog.component";
import {UserService} from "../../services/user/user.service";
import {User} from "../../services/user/user.entity";
import {MessageService} from "../../services/message/message.service";
import {CreateChatDialogComponent} from "./dialogs/create-chat-dialog/create-chat-dialog.component";
import {ContactDialogComponent} from "./dialogs/contact-dialog/contact-dialog.component";
import {MessageResponse} from "../../services/message/response/message.response";
import {ContactService} from "../../services/contact/contact.service";
import {ContactResponse} from "../../services/contact/response/contact.response";
import {ChatService} from "../../services/chat/chat.service";
import {ChatResponse} from "../../services/chat/response/chat.response";
import {ChatInformation} from "../../services/chat/chat.information";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatInput,
    MatSuffix,
    MatListItem,
    MatList,
    NgForOf,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatPrefix,
    MatActionList,
    MatButton,
    MatDivider,
    NgIf,
    NgOptimizedImage,
    MatBadge,
    DatePipe,
    MatFabButton,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  messageInfo : ChatInformation[] = []
  chatInfo : ChatResponse[] = []

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private contactService: ContactService,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.chatService.getAllChats().then(chats => {
      if (chats === null) return;
      this.chatInfo = chats;
      for (const chat of chats) {
        this.chatService.getInformation(chat.chatId).then(info => {
          this.messageInfo.push(info);
          this.cdr.detectChanges(); // Додаємо цей виклик для оновлення
        });
      }
      this.messageInfo.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    });
  }

  getFormattedDate(createdAt: Date): string {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);

    if (
      createdAtDate.getDate() === currentDate.getDate() &&
      createdAtDate.getMonth() === currentDate.getMonth() &&
      createdAtDate.getFullYear() === currentDate.getFullYear()
    ) {
      return `${createdAtDate.getHours()}:${createdAtDate.getMinutes()}`;
    }

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    if (
      createdAtDate.getDate() === yesterday.getDate() &&
      createdAtDate.getMonth() === yesterday.getMonth() &&
      createdAtDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Вчора';
    }

    return `${createdAtDate.getFullYear()}`;
  }

  openLogOutDialog(){
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '312px',
      height: '200px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms',
    })
  }

  openContactDialog(){
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '560px',
      height: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms'
    })
  }

  openCreateChatDialog() {

    const dialogRef = this.dialog.open(CreateChatDialogComponent, {
      width: '400px',
      height: '300px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms'
    })
  }
}

export interface ChatInfoHandler{
  username: string,
  lastmessage: string,
  lastmessagetime : string,
}

interface Chat{
  chatId : string,
  senderId : string,
  receiverId : string
}

interface LastMessage {
  id : string,
  chatId : string,
  senderId : string,
  message : string,
  status : string,
  createdAt : Date
}
