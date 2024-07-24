import { Component } from '@angular/core';
import {MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-account-dialog',
  standalone: true,
  imports: [
    MatDialogTitle
  ],
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.scss'
})
export class AccountDialogComponent {

}
