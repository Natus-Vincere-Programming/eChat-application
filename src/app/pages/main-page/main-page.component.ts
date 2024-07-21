import {ChangeDetectionStrategy, Component, inject, viewChild} from '@angular/core';
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatActionList, MatList, MatListItem} from "@angular/material/list";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AccountDialogComponent} from "./dialogs/account-dialog/account-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ContactDialogComponent} from "./dialogs/contact-dialog/contact-dialog.component";
import {MatBadge} from "@angular/material/badge";

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
    MatButton,
    NgOptimizedImage,
    MatBadge
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item11', 'Item12', 'Item13'];
  readonly dialog = inject(MatDialog);

  openAccountDialog() {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '600px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms',
    });
  }

  openContactDialog(){
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: '560px',
      height: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '100ms'
    })
  }
}
