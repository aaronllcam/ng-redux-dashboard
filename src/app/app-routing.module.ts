import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    //canActivate: [AuthGuard], // el can Activate tambien hace que me carge el modulo de ingreso egreso en la vista de loading y esto lo queremos prevenir, por lo tanto usaremos el canLoad
    canLoad: [ AuthGuard ],  //Con canload prevenimos que carge el modulo de ingreso egreso en la vista de login
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then( m => m.IngresoEgresoModule)
  },
  // {
  //   path: '', 
  //   component: DashboardComponent,
  //   children: dashboardRoutes,
  //   canActivate: [ AuthGuard ]
  // },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
