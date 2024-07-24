import {AfterViewChecked, Component, ElementRef, input, OnInit, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MessageComponent} from "../../message/message.component";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {merge, pipe} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {Message} from "@stomp/stompjs";
import {MessageService} from "../../services/message/message.service";
import {ChatService} from "../../services/chat/chat.service";
import {MessageResponse} from "../../services/message/response/message.response";
import {SendMessageRequest} from "../../services/message/request/send-message.request";
import {UserResponse} from "../../services/user/response/user.response";
import {resolveObjectURL} from "node:buffer";


interface MessageEntity {
  userId: number;
  text: string;
  date: string;
  readStatus:string;
}



@Component({
  selector: 'app-chat-component',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    MessageComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatButton,
    MatPrefix,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    DatePipe

  ],
  templateUrl: './chat-component.component.html',
  styleUrl: './chat-component.component.scss'
})
export class ChatComponentComponent implements OnInit{
  @ViewChild("endOfChat") endOfChat!:ElementRef;

  chatForm: FormGroup=new FormGroup({
    inputText : new FormControl("", [])
  });
  messages: MessageResponse[] = [];
  user?: UserResponse;




  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
    private messageService : MessageService,
    private chatService : ChatService
  ) {
    const{inputText} = this.chatForm.controls;
    merge(inputText.valueChanges, inputText.statusChanges, inputText.updateOn)
      .pipe(takeUntilDestroyed())

    this.messageService.getMessages(this.getChatIdFromUrl()).then(messages => {
      this.messages = messages;
    })

    this.scrollToBottom();
  }

  ngOnInit(): void {
      this.userService.getAuthenticated().then(user => {
        if (user === null) return;
        this.user = user
      })
    }

  scrollToBottom(){
      setTimeout(()=>{
        if(this.endOfChat){
          this.endOfChat.nativeElement.scrollIntoView({behavior:"smooth"})
        }
      },10)

  }

  isTextInputNotEmpty(): boolean {
    const inputValue = this.chatForm.get('inputText')?.value;
    return inputValue != null && inputValue.length > 0;
  }

  getChatIdFromUrl(): string {
    return this.route.snapshot.params['id'];
  }

  sendMessage(message: string) {
    if (this.isTextInputNotEmpty()) {
      const newMessage: SendMessageRequest = {
        chatId : this.getChatIdFromUrl(),
        text : message
      };
      this.messageService.sendMessage(newMessage).then(message => {
        if (message === null) return;
        this.messages.push(message);
      })
      this.scrollToBottom();
      console.log('Повідомлення надіслано:', newMessage);
      this.chatForm.controls['inputText'].setValue('');
    }
  }
  onEnter() {
    if(this.isTextInputNotEmpty()){
      this.sendMessage(this.chatForm.get('inputText')?.value);
    }
  }

  ifMyMessage(message : MessageResponse){
    if (message.senderId === this.user?.id){
      return false;
    }
    else if(message.senderId !== this.user?.id){
      return true;
    }
    else {
      return false;
    }
  }
}

