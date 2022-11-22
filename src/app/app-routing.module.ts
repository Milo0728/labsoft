import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { OlvidarPasswordComponent } from './components/olvidar-password/olvidar-password.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificarEmailComponent } from './components/verificar-email/verificar-email.component';

// Route Guard
import { AuthGuard } from './shared/guard/auth.guard';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent
  },
  {
    path: 'editar-usuario/:id',
    component: EditarUsuarioComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard] 

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'olvidar-password',
    component: OlvidarPasswordComponent
  },
  {
    path: 'verificar-email',
    component: VerificarEmailComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
