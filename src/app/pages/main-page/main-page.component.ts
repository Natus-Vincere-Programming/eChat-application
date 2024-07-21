import {ChangeDetectionStrategy, Component, inject, viewChild} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AccountDialogComponent} from "./account-dialog/account-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatInput,
    MatSuffix,
    MatListItem,
    MatList,
    NgForOf,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatPrefix,
    MatActionList,
    MatButton
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

}
