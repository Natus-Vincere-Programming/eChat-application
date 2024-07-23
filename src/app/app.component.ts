import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {MessageComponent} from "./message/message.component";
import {EmailVerificationPageComponent} from "./pages/email-verification-page/email-verification-page.component";
import {AuthenticationService} from "./services/authentication/authentication.service";
import {JwtService} from "./services/jwt/jwt.service";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,
    MainPageComponent,
    EmailVerificationPageComponent,
    MessageComponent]
})
export class AppComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService
  ) {
  }

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}



