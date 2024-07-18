import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Paciente } from '../model/paciente';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss'
})
export class PacientesComponent{
  pacientes: Observable<Paciente[]>;
  displayedColumns = ['id','nome','sobrenome','cpf','telefone','email']

  constructor( private service : PacienteService){
        this.pacientes = this.service.getAll();
  }



}
