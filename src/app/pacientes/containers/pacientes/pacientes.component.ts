import { catchError, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { HeaderComponent } from '../../../shared/header/header.component';
import { ListaComponent } from '../../components/lista/lista.component';
import { Paciente } from '../../model/paciente';
import { PacienteService } from '../../services/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErroComponent } from '../../../shared/dialog-erro/dialog-erro.component';
import { MatCard } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogConfirmaExclusaoComponent } from '../../../shared/dialog-confirma-exclusao/dialog-confirma-exclusao.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogFormularioComponent } from '../dialog-formulario/dialog-formulario.component';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    MatTableModule,
    MatCard,
    MatToolbarModule,
    MatProgressSpinnerModule,
    CommonModule,
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    ListaComponent,
  ],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss',
})
export class PacientesComponent {
  pacientes$!: Observable<Paciente[]>;

  constructor(
    private service: PacienteService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.recarregaDadosPagina();
  }

  recarregaDadosPagina() {
    this.pacientes$ = this.service.getAll().pipe(
      catchError((error) => {
        this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
        return of([]);
      })
    );
  }

  openDialogErro(mensagem: string) {
    this.dialog.open(DialogErroComponent, {
      data: mensagem,
    });
  }

  adicionar() {
    const dialogRef = this.dialog.open(DialogFormularioComponent, {
      minWidth: '450px',
      minHeight: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.recarregaDadosPagina();
    });
  }

  editar(paciente: Paciente) {
    const dialogRef = this.dialog.open(DialogFormularioComponent, {
      minWidth: '450px',
      minHeight: '250px',
      data: paciente,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.recarregaDadosPagina();
    });
  }

  deletar(paciente: Paciente) {
    const dialogRef = this.dialog.open(DialogConfirmaExclusaoComponent, {
      data: 'Tem certeza que deseja remover esse paciente?',
    });

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        this.service.delete(paciente.id).subscribe(
          () => {
            this.snackBarSucesso();
            this.recarregaDadosPagina()
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
}
