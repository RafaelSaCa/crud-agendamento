import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly apiUrl = "http://localhost:8080/api/pacientes";

  constructor( private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Paciente[]>(this.apiUrl)
              .pipe(
                 first(),
                 tap(pacientes => console.log(pacientes))
              );
  }
}
