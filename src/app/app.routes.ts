import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pacientes' },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./pacientes/pacientes.module').then((m) => m.PacientesModule),
  },
  {
    path: 'agendamentos',
    loadChildren: () =>
      import('./agendamentos/agendamentos.module').then(
        (m) => m.AgendamentosModule
      ),
  },
  {
    path: 'procedimentos',
    loadChildren: () =>
      import('./procedimentos/procedimentos.module').then(
        (m) => m.ProcedimentosModule
      ),
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./medicos/medicos.module').then(
        (m) => m.MedicosModule
      ),
  },
];
