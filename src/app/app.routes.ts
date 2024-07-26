import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pacientes' },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule)
  },
  {
    path:'agendamentos',
    loadChildren: () => import('./agendamentos/agendamentos.module').then(m => m.AgendamentosModule)
  }
];
