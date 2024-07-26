import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { catchError, of } from 'rxjs';
import { ResponseAgendamento } from '../model/response-agendamento';
import { AgendamentoService } from '../services/agendamento.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatButtonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
})
export class ListaComponent {
  @Input() agendamentos: ResponseAgendamento[] = [];

  constructor( private service : AgendamentoService){
    this.recarregaDadosPagina();
  }

  recarregaDadosPagina(){
    this.service.lista().pipe(
      catchError((error) =>{
        console.log( 'ocorreu algum erro');
        return of([])
      })
    );
      console.log(this.agendamentos);
    return this.agendamentos;

  }
}
