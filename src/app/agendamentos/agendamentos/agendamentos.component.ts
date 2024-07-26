import { catchError, Observable, of } from 'rxjs';
import { ListaComponent } from './../lista/lista.component';
import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgendamentoService } from '../services/agendamento.service';
import { ResponseAgendamento } from '../model/response-agendamento';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-agendamentos',
  standalone: true,
  imports: [MatToolbarModule, MatTabsModule, ListaComponent, MatProgressSpinner,CommonModule],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.component.scss',
})
export class AgendamentosComponent{
  agendamentos$!: Observable<ResponseAgendamento[]>;

  constructor(private service: AgendamentoService){
    this.recarregaDadosPagina();
  }

  recarregaDadosPagina(){
    this.agendamentos$ = this.service.lista().pipe(
      catchError((error)=>{
        console.log('ocorreu algum erro');
        return of ([]);
      })
    );
  }
}
