import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Procedimento } from '../model/procedimento';

@Injectable({
  providedIn: 'root',
})
export class ProcedimentoService {
  private readonly apiUrl = 'http://localhost:8080/api/procedimento';

  constructor( private httpClient: HttpClient) {}

  listar(){
   return this.httpClient.get<Procedimento[]>(this.apiUrl);
  }
}
