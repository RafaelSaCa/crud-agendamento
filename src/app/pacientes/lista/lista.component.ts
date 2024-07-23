import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { DialogErroComponent } from '../../shared/dialog-erro/dialog-erro.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { DialogFormularioComponent } from '../dialog-formulario/dialog-formulario.component';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
})
export class ListaComponent {
  @Input() pacientes: Paciente[] = [];

  displayedColumns = ['id','nome','sobrenome','cpf','telefone','email','acoes'];

  constructor(private service: PacienteService, public dialog: MatDialog) {}

  recarregaDadosPagina() {
    this.service.getAll().pipe(
      catchError((error) => {
        this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
        return of([]);
      })
    );
    return this.pacientes;
  }

  openDialogFormulario() {
      const dialogRef = this.dialog.open(DialogFormularioComponent, {
      minWidth: '450px',
      minHeight: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.recarregaDadosPagina();
    });
  }

  openDialogErro(mensagem: string) {
    this.dialog.open(DialogErroComponent, {
      data: mensagem,
    });
  }
}
