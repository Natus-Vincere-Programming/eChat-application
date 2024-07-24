import { Component } from '@angular/core';
import {MatButton,MatIconButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,

} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

interface Session {
  ip: string;
  location: string;
  browser: string;
  selected: boolean;
}

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    NgForOf,
    MatCheckbox,
    FormsModule
  ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent {
  sessions: Session[] = [
    { ip: '192.168.204.62', location: 'Луцьк', browser: 'Chrome', selected: false },
    { ip: '191.2222222', location: 'Гондурас', browser: 'Mozilla', selected: false }
  ];

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>) {}

  logout() {
    // const selectedSessions = this.sessions.filter(session => session.selected);
    this.sessions = this.sessions.filter(session => !session.selected);

    // console.log('Remaining sessions:', this.sessions);
    // this.dialogRef.close();
  }
}
