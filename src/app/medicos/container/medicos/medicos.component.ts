import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';
import { DialogErroComponent } from '../../../shared/dialog-erro/dialog-erro.component';
import { ListaMedicosComponent } from '../../components/lista-medicos/lista-medicos.component';
import { Medico } from '../../model/medico';
import { MedicoService } from '../../service/medico.service';
import { FormMedicoComponent } from './../form-medico/form-medico.component';
import { DialogConfirmaExclusaoComponent } from '../../../shared/dialog-confirma-exclusao/dialog-confirma-exclusao.component';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    ListaMedicosComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.scss',
})
export class MedicosComponent {
  medicos$!: Observable<Medico[]>;

  constructor(
    private service: MedicoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.recarregarDados();
  }

  recarregarDados() {
    this.medicos$ = this.service.listar().pipe(
      catchError((error) => {
        this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
        return of([]);
      })
    );
  }

  adicionar() {
    const dialogRef = this.dialog.open(FormMedicoComponent, {
      minWidth: '450px',
      minHeight: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.recarregarDados();
    });
  }

  editar(medico: Medico) {
    const dialogRef = this.dialog.open(FormMedicoComponent, {
      minWidth: '450px',
      minHeight: '250px',
      data: medico,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.recarregarDados();
    });
  }

  deletar(medico: Medico) {
    const dialogRef = this.dialog.open(DialogConfirmaExclusaoComponent, {
      data: 'Tem certeza que deseja remover esse médico?',
    });

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        this.service.deletar(medico.id).subscribe(
          () => {
            this.snackBarSucesso();
            this.recarregarDados();
          },
          () => this.snackBarErro()
        );
      }
    });
  }

  private snackBarSucesso() {
    this.snackBar.open('Dados removidos com sucesso!', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private snackBarErro() {
    this.snackBar.open('Ocorreu um erro ao remover os dados!', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  openDialogErro(mensagem: string) {
    this.dialog.open(DialogErroComponent, {
      data: mensagem,
    });
  }
}
