import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MessageComponent} from "../../message/message.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-chat-component',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    MessageComponent,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './chat-component.component.html',
  styleUrl: './chat-component.component.scss'
})
export class ChatComponentComponent {

}
