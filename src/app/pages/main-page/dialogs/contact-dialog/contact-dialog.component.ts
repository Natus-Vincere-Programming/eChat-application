import { Component } from '@angular/core';
import {MatDialogClose, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";

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
export class ContactDialogComponent {
  items = ['item1', 'item2', 'item3', 'item4'];
}
