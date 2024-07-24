import {Component, OnInit} from '@angular/core';
import {MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {ContactResponse} from "../../../../services/contact/response/contact.response";
import {User} from "../../../../services/user/user.entity";
import {UserService} from "../../../../services/user/user.service";
import {ContactService} from "../../../../services/contact/contact.service";
import {FormControl, FormGroup} from "@angular/forms";
import {UserResponse} from "../../../../services/user/response/user.response";

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
    NgIf
  ],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent implements OnInit{
  inputForm : FormGroup = new FormGroup(
    {
      input: new FormControl('', [])
    }
  )
  contacts : ContactResponse[] | null = []
  users : UserResponse[] | null = []
  constructor(
    private userService: UserService,
    private contactService: ContactService
  ) {
    const {input} = this.inputForm.controls;
  }

  ngOnInit(): void {
        this.contactService.getContacts().then(contacts => {
          this.contacts = contacts;
          if (contacts) {
            for (let contact of contacts) {
              this.userService.getById(contact.id).then(user => {
                if (user === null) return;
                this.users?.push(user);
              })
            }
          }
        })
    }
}
