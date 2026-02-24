import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './constants/Roles';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard] },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { roles: [Roles.ADMIN] } }
  ]},
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
