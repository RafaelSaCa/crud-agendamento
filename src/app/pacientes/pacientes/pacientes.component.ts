import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { catchError, Observable, of } from 'rxjs';
import { HeaderComponent } from '../../shared/header/header.component';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../services/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErroComponent } from '../../shared/dialog-erro/dialog-erro.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogFormularioComponent } from '../dialog-formulario/dialog-formulario.component';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss',
})
export class PacientesComponent {
  pacientes$: Observable<Paciente[]>;
  displayedColumns = ['id','nome','sobrenome','cpf','telefone','email','acoes'];

  constructor( private service: PacienteService, public dialog: MatDialog, private router: Router,private route: ActivatedRoute) {
    this.pacientes$ = this.service.getAll().pipe(
      catchError((error) => {
        this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
        return of([]);
      })
    );
  }



  recarregaDadosPagina(){
     this.pacientes$ = this.service.getAll().pipe(
       catchError((error) => {
         this.openDialogErro('Ocorreu algum erro ao acessar os dados!');
         return of([]);
       }));
    return this.pacientes$;
  }

  openDialogFormulario() {
    // this.router.navigate(['cadastrar'], {relativeTo: this.route});
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
