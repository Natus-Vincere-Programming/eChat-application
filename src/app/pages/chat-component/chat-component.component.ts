import {AfterViewChecked, Component, ElementRef, input, ViewChild} from '@angular/core';
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
export class ChatComponentComponent {
  @ViewChild("endOfChat") endOfChat!:ElementRef;

  chatForm: FormGroup=new FormGroup({
    inputText : new FormControl("", [])
  });
  messages: MessageEntity[] = [];




  constructor() {
    const{inputText} = this.chatForm.controls;
    merge(inputText.valueChanges, inputText.statusChanges, inputText.updateOn)
      .pipe(takeUntilDestroyed())

    this.messages = [
      {
        userId: 1,
        text: 'Привіт! Як справи?',
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        readStatus: 'read'
      },
      {
        userId: 2,
        text: 'Все добре, дякую! А у тебе?',
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        readStatus: 'unread'
      },
      {
        userId: 1,
        text: 'Теж все добре!',
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        readStatus: 'read'
      },
      {
        userId: 1,
        text: 'Привіт! Як справи?',
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        readStatus: 'read'
      },
      {
        userId: 2,
        text: 'Все добре, дякую! А у тебе?',
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        readStatus: 'unread'
      },
      {
        userId: 1,
        text: 'Теж все добре!',
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        readStatus: 'read'
      }
    ];

    this.scrollToBottom();
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

  sendMessage(message: string) {
    if (this.isTextInputNotEmpty()) {
      const newMessage: MessageEntity = {
        userId: 2,
        text: message,
        date: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
        readStatus: 'unread'
      };
      this.messages.push(newMessage);
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
}

