import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AuthenticationService} from "../../../../services/authentication/authentication.service";
import {Route, Router} from "@angular/router";
import {JwtService} from "../../../../services/jwt/jwt.service";

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [
    MatDialogClose,
    MatDialogTitle,
    MatIcon,
    MatIconButton,
    MatDialogContent,
    MatButton,
    MatDialogActions
  ],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {

  constructor(
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    private router: Router,
    private jwtService: JwtService
  ) {}

  logout() {
    this.authenticationService.logout().then(() => {
      this.dialogRef.close();
      this.jwtService.removeAccessToken();
      this.router.navigate(['/login']);
    })
  }
}
