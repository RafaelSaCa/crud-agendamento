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

  constructor(private service: PacienteService, public dialog: MatDialog) {
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
}
