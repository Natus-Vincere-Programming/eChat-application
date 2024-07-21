import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {MessageComponent} from "./message/message.component";
import {EmailVerificationPageComponent} from "./pages/email-verification-page/email-verification-page.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,
    EmailVerificationPageComponent,
    MessageComponent]
})
export class AppComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry) {
  }

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}



