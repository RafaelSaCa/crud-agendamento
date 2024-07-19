import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-erro',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-erro.component.html',
  styleUrl: './dialog-erro.component.scss',
})
export class DialogErroComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogErroComponent) {}

}
