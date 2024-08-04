import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Medico } from '../../model/medico';

@Component({
  selector: 'app-lista-medicos',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule,MatIconModule],
  templateUrl: './lista-medicos.component.html',
  styleUrl: './lista-medicos.component.scss',
})
export class ListaMedicosComponent {
  @Input() medicos: Medico[] = [];
  @Output() cadastrar = new EventEmitter(false);
  @Output() editar = new EventEmitter(false);
  @Output() deletar = new EventEmitter(false);

   displayedColumns = ['id', 'nome', 'sobrenome', 'crm', 'telefone','acoes'];

   salvar(){
    this.cadastrar.emit();
   }

   edicao(medico: Medico){
    this.editar.emit(medico);
   }

   remocao(medico: Medico){
    this.deletar.emit(medico);
   }
}
