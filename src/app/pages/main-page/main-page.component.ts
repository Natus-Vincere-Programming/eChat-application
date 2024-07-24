import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {MatBadge} from "@angular/material/badge";
import {LogoutDialogComponent} from "./dialogs/logout-dialog/logout-dialog.component";
import {UserService} from "../../services/user/user.service";
import {MessageService} from "../../services/message/message.service";
import {CreateChatDialogComponent} from "./dialogs/create-chat-dialog/create-chat-dialog.component";
import {ContactDialogComponent} from "./dialogs/contact-dialog/contact-dialog.component";
import {ContactService} from "../../services/contact/contact.service";
import {ChatService} from "../../services/chat/chat.service";
import {ChatResponse} from "../../services/chat/response/chat.response";
import {ChatInformation} from "../../services/chat/chat.information";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {RouterLink} from "@angular/router";

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
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  filteredMessages : ChatInformation[] = [];
  searchTerm: string = '';
  messageInfo: ChatInformation[] = []
  chatInfo: ChatResponse[] = []
  searchForm: FormGroup = new FormGroup({
    search : new FormControl("", [Validators.required])
  })

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private contactService: ContactService,
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {
    const {search} = this.searchForm.controls;
    merge(search.statusChanges, search.valueChanges, search.updateOn)
      .pipe(takeUntilDestroyed())
  }

  ngOnInit(): void {
    this.loadChats();

    this.searchForm.get('search')?.valueChanges.subscribe(() => {
      this.filterMessages();
    });
  }

  loadChats() {
    this.chatService.getAllChats().then(chats => {
      if (chats === null) return;
      this.chatInfo = chats;
      const infoPromises = chats.map(chat => this.chatService.getInformation(chat.chatId));

      Promise.all(infoPromises).then(infoArray => {
        this.messageInfo = infoArray;
        this.messageInfo.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        this.filteredMessages = [...this.messageInfo];
        this.cdr.detectChanges(); // Trigger change detection
      });
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

  filterMessages() {
    console.log('Search Term:', this.searchTerm);
    console.log('Original Messages:', this.messageInfo);
    const{search} = this.searchForm.controls;
    this.searchTerm = search.value;
    if (!this.searchTerm.trim()) {
      this.filteredMessages = this.messageInfo;
    } else {
      this.filteredMessages = this.messageInfo
        .filter(message =>
          message.receiverName.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
        )
        .sort((a, b) =>
          a.receiverName.localeCompare(b.receiverName)
        );
    }

    console.log('Filtered Messages:', this.filteredMessages);
  }

  openLogOutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '312px',
      height: '200px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms',
    })
  }

  openContactDialog() {
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
    dialogRef.afterClosed().subscribe(info => {
      if (info) {
        let isExist : boolean = true
        for (let mess of this.messageInfo) {
          if (mess.chatId == info.chatId){
            isExist = false;
          }
        }
        if (isExist) {
          this.messageInfo.push(info);
          this.cdr.detectChanges();
        }
      }
    })
    this.messageInfo.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  protected readonly onkeydown = onkeydown;
}

export interface ChatInfoHandler {
  username: string,
  lastmessage: string,
  lastmessagetime: string,
}

interface Chat {
  chatId: string,
  senderId: string,
  receiverId: string
}

interface LastMessage {
  id: string,
  chatId: string,
  senderId: string,
  message: string,
  status: string,
  createdAt: Date
}
