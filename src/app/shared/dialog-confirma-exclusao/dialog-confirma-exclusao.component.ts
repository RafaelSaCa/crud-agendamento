import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogErroComponent } from '../dialog-erro/dialog-erro.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-confirma-exclusao',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-confirma-exclusao.component.html',
  styleUrl: './dialog-confirma-exclusao.component.scss',
})
export class DialogConfirmaExclusaoComponent {

  constructor( public dialogRef: MatDialogRef<DialogConfirmaExclusaoComponent>,
                      @Inject(MAT_DIALOG_DATA) public data: string) {}

  confirma( resultado: boolean){
    this.dialogRef.close( resultado);
  }

}
