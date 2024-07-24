import {Component, inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {ContactResponse} from "../../../../services/contact/response/contact.response";
import {User} from "../../../../services/user/user.entity";
import {UserService} from "../../../../services/user/user.service";
import {ContactService} from "../../../../services/contact/contact.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserResponse} from "../../../../services/user/response/user.response";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {ContactRequest} from "../../../../services/contact/request/contact.request";
import {merge, take} from "rxjs";
import {ErrorMessageHandler} from "../../../../utility/error-message.handler";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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
    ReactiveFormsModule,
    MatSuffix
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent implements OnInit{

  readonly dialog = inject(MatDialog);
  inputForm : FormGroup = new FormGroup(
    {
      input: new FormControl('', [])
    }
  )
  errorHandler : InputErrorHandler = {
    input : new ErrorMessageHandler("", "", "Користувача не існує")
  };
  users: UserResponse[] = [];
  user?: UserResponse
  constructor(
    private userService: UserService,
    private contactService: ContactService
  ) {
    const {input} = this.inputForm.controls;
    merge(input.statusChanges, input.valueChanges, input.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.errorHandler.input.updateErrorMessage(input));
  }

  OnSubmit() {
    const { input } = this.inputForm.controls;
    const userName = input.value;

    this.userService.findByUsername(userName).then(user => {
      if (user) {
        const contactRequest: ContactRequest = {
          contactId: user.id
        };

        this.contactService.addContact(contactRequest).then(id => {
          if (id) {
            this.userService.getById(id.contactId).then(user => {
              if (user === null) return;
              let isExist = true
              for (let userId of this.users){
                if (userId.id === user.id) {
                  isExist = false;
                }
              }
              if (isExist) {
                this.users.push(user);
              }
            })
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
    const {input} = this.inputForm.controls;
    input.setErrors({invalidCredentials: true});
    merge(input.valueChanges)
      .pipe(take(1))
      .subscribe(() => input.setErrors(null));
  }

  onListClick(id : string){

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '312px',
      height: '200px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms',
      data: { id: id }
    })
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(id => {
        if (id == null){
          return;
        }
        this.users.splice(this.users.findIndex(user => user.id === id), 1)
      });
  }

  ngOnInit(): void {
        this.contactService.getContacts().then(contacts => {
          if (contacts) {
            for (let contact of contacts) {
              this.userService.getById(contact.contactId).then(user => {
                if (user === null) return;
                this.users?.push(user);
              })
            }
          }
        })
    }
}

interface InputErrorHandler {
  input: ErrorMessageHandler;
}
