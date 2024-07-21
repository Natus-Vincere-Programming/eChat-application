import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() text!: string;
  @Input() time!: string;
  @Input() stat!: string;

}
