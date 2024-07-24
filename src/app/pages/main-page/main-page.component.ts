import {ChangeDetectionStrategy, Component, inject, OnInit, viewChild} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {ContactDialogComponent} from "./dialogs/contact-dialog/contact-dialog.component";
import {MatBadge} from "@angular/material/badge";
import {LogoutDialogComponent} from "./dialogs/logout-dialog/logout-dialog.component";
import {SettingsDialogComponent} from "./dialogs/settings-dialog/settings-dialog.component";
import {UserService} from "../../services/user/user.service";
import {User} from "../../services/user/user.entity";
import {ChatService} from "../../services/chat.service";
import {MessageService} from "../../services/message/message.service";
import {ChatAndContactService} from "../../services/contact/chat-and-contact.service";

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
    NgIf
    NgOptimizedImage,
    MatBadge,
    DatePipe
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  messageInfo : LastMessage[] = []
  chatInfo : Chat[] = []

  constructor(
    private userService: UserService,
    private contactService: ChatAndContactService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.contactService.getAllChats().then(chats => {
      this.chatInfo = chats;
      for (const chat of chats){
        this.messageService.getLastMessageInfo(chat.chatId).then(mess => {
          if (mess) {
            this.messageInfo.push(mess);
          }
        })
      }
      this.messageInfo.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    })
  }







  getFormattedDate(createdAt: Date): string {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);

    if (
      createdAtDate.getDate() === currentDate.getDate() &&
      createdAtDate.getMonth() === currentDate.getMonth() &&
      createdAtDate.getFullYear() === currentDate.getFullYear()
    ) {
      return 'HH:mm';
    }

    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    if (
      createdAtDate.getDate() === yesterday.getDate() &&
      createdAtDate.getMonth() === yesterday.getMonth() &&
      createdAtDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'dd:MM:YY';
    }

    return 'dd:MM:YY';
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

  openSettingsDialog() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '312px',
      height: '282px',
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
