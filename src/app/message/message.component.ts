import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    NgClass,
    MatIcon
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() text: string = '';
  @Input() time: string = '';
  @Input() img_stat!: string;
  @Input() myMess: boolean = true;
}
