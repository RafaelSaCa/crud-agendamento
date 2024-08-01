import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedimentosComponent } from './container/procedimentos/procedimentos.component';

const routes: Routes = [
  { path:'', component: ProcedimentosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedimentosRoutingModule { }
