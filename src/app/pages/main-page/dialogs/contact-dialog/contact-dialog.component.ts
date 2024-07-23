import {Component, ErrorHandler, OnInit} from '@angular/core';
import {MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../../services/user/user.entity";
import {UserService} from "../../../../services/user/user.service";
import {ChatAndContactService} from "../../../../services/contact/chat-and-contact.service";
import {ErrorMessageHandler} from "../../../../utility/error-message.handler";
import {merge, take} from "rxjs";

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatIcon,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatDialogClose,
    MatList,
    MatActionList,
    MatListItem,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent implements OnInit{
  items = ['item1', 'item2', 'item3', 'item4'];
  inputForm : FormGroup = new FormGroup(
    {
      input : new FormControl("", [])
    }
  );
  errorHandler : InputErrorHandler = {
    input : new ErrorMessageHandler("", "", "Користувача не існує")
  };
  userInfo : User[] = []
  contactInfo : Contact[] = []
  userBuffer? : User


  constructor(
    private userService: UserService,
    private contactService: ChatAndContactService

  ) {
    const {input} = this.inputForm.controls;

  }

  OnSubmit() {
    const { input } = this.inputForm.controls;
    const userName = input.value;

    this.userService.getUserByUserName(userName).then(user => {
      if (user) {
        const contactRequest: ContactRequest = {
          contactId: user.id
        };

        this.contactService.createNewContact(contactRequest).then(id => {
          if (id) {
          } else {
            this.setInputErrors();
          }
        });
      } else {
        this.setInputErrors();
      }
    });
  }

  setInputErrors(): void {
    const { input } = this.inputForm.controls;
    this.userService.getUserByUserName(input.value).then(user => {
      if (user === null) {
        input.setErrors({ invalidCredentials: true });
      } else {
        this.userBuffer = user;
        input.setErrors(null);
      }
    });

    merge(input.valueChanges)
      .pipe(take(1))
      .subscribe(() => input.setErrors(null));
  }


  ngOnInit(): void {
        this.contactService.getAllContacts().then(contacts => {
          this.contactInfo = contacts;
          for (const contact of contacts) {
            this.userService.getUserById(contact.id).then(user => {
              if (user === null) return;
              this.userInfo.push(user);
            })
          }
        })
    }
}

interface Contact{
  id : string,
  contactId : string
}

interface InputErrorHandler {
  input: ErrorMessageHandler;
}

interface ContactRequest {
  contactId : string
}


