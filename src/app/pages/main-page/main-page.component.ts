import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatFormField
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
