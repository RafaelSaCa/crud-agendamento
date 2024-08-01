import { Component } from '@angular/core';
import { Procedimento } from '../../model/procedimento';
import { catchError, Observable, of } from 'rxjs';
import { ProcedimentoService } from '../../service/procedimento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErroComponent } from '../../../shared/dialog-erro/dialog-erro.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListaProcedimemtosComponent } from "../../components/lista-procedimemtos/lista-procedimemtos.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-procedimentos',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, ListaProcedimemtosComponent, MatProgressSpinnerModule,CommonModule],
  templateUrl: './procedimentos.component.html',
  styleUrl: './procedimentos.component.scss',
})
export class ProcedimentosComponent {
  procedimentos$!: Observable<Procedimento[]>;

  constructor(private service: ProcedimentoService, public dialog: MatDialog) {
    this.recarregarDados();
  }

  recarregarDados() {
    this.procedimentos$ = this.service.listar().pipe(
      catchError((error) => {
         this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
         return of([]);
      }));
  }


  openDialogErro(mensagem: string) {
    this.dialog.open(DialogErroComponent, {
      data: mensagem,
    });
  }
}
