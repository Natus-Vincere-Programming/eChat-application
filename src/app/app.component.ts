import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
//import {MainPageComponent} from "./pages/main-page/main-page.component";
import {MessageComponent} from "./message/message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,
    MessageComponent]
})
export class AppComponent implements OnInit {

  constructor(private iconRegistry: MatIconRegistry) {
  }

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}



