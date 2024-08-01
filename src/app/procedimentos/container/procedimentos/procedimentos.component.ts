import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';
import { DialogConfirmaExclusaoComponent } from '../../../shared/dialog-confirma-exclusao/dialog-confirma-exclusao.component';
import { DialogErroComponent } from '../../../shared/dialog-erro/dialog-erro.component';
import { ListaProcedimentosComponent } from "../../components/lista-procedimentos/lista-procedimentos.component";
import { FormProcedimentoComponent } from '../../form-procedimento/form-procedimento.component';
import { Procedimento } from '../../model/procedimento';
import { ProcedimentoService } from '../../service/procedimento.service';


@Component({
  selector: 'app-procedimentos',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ListaProcedimentosComponent,
    CommonModule,
  ],
  templateUrl: './procedimentos.component.html',
  styleUrl: './procedimentos.component.scss',
})
export class ProcedimentosComponent {
  procedimentos$!: Observable<Procedimento[]>;

  constructor(private service: ProcedimentoService, public dialog: MatDialog,private snackBar: MatSnackBar) {
    this.recarregarDados();
  }

  recarregarDados() {
    this.procedimentos$ = this.service.listar().pipe(
      catchError((error) => {
        this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
        return of([]);
      })
    );
  }

  adicionar() {
    const dialogRef = this.dialog.open(FormProcedimentoComponent, {
      minWidth: '450px',
      minHeight: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.recarregarDados();
    });
  }

  editar(procedimento: Procedimento) {
    const dialogRef = this.dialog.open(FormProcedimentoComponent, {
      minWidth: '450px',
      minHeight: '250px',
      data: procedimento,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.recarregarDados();
    });
  }

  deletar(procedimento: Procedimento) {
    const dialogRef = this.dialog.open(DialogConfirmaExclusaoComponent, {
      data: 'Tem certeza que deseja remover esse procedimento?',
    });

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        this.service.deletar(procedimento.id).subscribe(
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
