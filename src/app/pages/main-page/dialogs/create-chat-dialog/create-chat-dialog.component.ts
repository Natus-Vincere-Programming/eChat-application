import {Component, Inject, input} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {ContactService} from "../../../../services/contact/contact.service";
import {ChatService} from "../../../../services/chat/chat.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageHandler} from "../../../../utility/error-message.handler";
import {ContactRequest} from "../../../../services/contact/request/contact.request";
import {UserService} from "../../../../services/user/user.service";
import {CreateChatRequest} from "../../../../services/chat/request/create-chat.request";

@Component({
  selector: 'app-create-chat-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatPrefix,
  ],
  templateUrl: './create-chat-dialog.component.html',
  styleUrl: './create-chat-dialog.component.scss'
})
export class CreateChatDialogComponent {
  inputForm : FormGroup = new FormGroup(
    {
      input: new FormControl('', [])
    }
  )
  errorHandler : InputErrorHandler = {
    input : new ErrorMessageHandler("", "", "Користувача не існує")
  };
  constructor(
    private chatService: ChatService,
    private userService : UserService,
    private contactService : ContactService,
    public dialogRef: MatDialogRef<CreateChatDialogComponent>
  ) {
  }

  onSubmit() {
    const {input} = this.inputForm.controls;
    const userName = input.value;

    this.userService.findByUsername(userName).then(user => {
      if (user) {
        const contactRequest: ContactRequest = {
          contactId: user.id
        };
      }
      this.userService.findByUsername(userName).then(user => {
        if (user === null) return;
        const chatRequest : CreateChatRequest = {
          receiverId : user.id,
        };
        this.chatService.createChat(chatRequest).then(chat => {
            if (chat === null) return;
            this.chatService.getInformation(chat.chatId).then(info => {
              if (info) {
                this.dialogRef.close(info);
              }
            })
          }
        )
      })
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  protected readonly input = input;
}

interface InputErrorHandler {
  input: ErrorMessageHandler;
}
