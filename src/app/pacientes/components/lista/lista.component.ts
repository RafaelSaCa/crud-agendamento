import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { DialogErroComponent } from '../../../shared/dialog-erro/dialog-erro.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { DialogFormularioComponent } from '../../containers/dialog-formulario/dialog-formulario.component';
import { Paciente } from '../../model/paciente';
import { PacienteService } from '../../services/paciente.service';
import { DialogConfirmaExclusaoComponent } from '../../../shared/dialog-confirma-exclusao/dialog-confirma-exclusao.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @Output() cadastrar = new EventEmitter(false);
  @Output() edicao= new EventEmitter(false);
  @Output() remover = new EventEmitter(false);

  displayedColumns = [
    'id',
    'nome',
    'sobrenome',
    'cpf',
    'telefone',
    'email',
    'acoes',
  ];

  constructor(
    private service: PacienteService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.recarregaDadosPagina();
  }

  recarregaDadosPagina() {
    this.service.getAll().pipe(
      catchError((error) => {
        this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
        return of([]);
      })
    );
    return this.pacientes;
  }

  adicionar(){
    this.cadastrar.emit();
  }

  editar(paciente: Paciente){
    this.edicao.emit(paciente);
  }
  deletar(paciente: Paciente){
    this.remover.emit(paciente);
  }

  openDialogErro(mensagem: string) {
    this.dialog.open(DialogErroComponent, {
      data: mensagem,
    });
  }

}
