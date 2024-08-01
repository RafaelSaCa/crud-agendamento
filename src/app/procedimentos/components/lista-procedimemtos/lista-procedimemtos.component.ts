import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Procedimento } from '../../model/procedimento';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-procedimemtos',
  standalone: true,
  imports: [MatTableModule, MatIconModule,MatCardModule, MatButtonModule],
  templateUrl: './lista-procedimemtos.component.html',
  styleUrl: './lista-procedimemtos.component.scss',
})
export class ListaProcedimemtosComponent {
  @Input() procedimentos: Procedimento[] = [];
  @Output() cadastrar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() deletar = new EventEmitter(false);

  displayedColumns = ['id', 'descricao','acoes'];

  salvar(){
    this.cadastrar.emit();
  }

  edicao(procedimento: Procedimento){
    this.editar.emit(procedimento);
  }

  remocao(procedimento: Procedimento){
    this.deletar.emit(procedimento);
  }

}
