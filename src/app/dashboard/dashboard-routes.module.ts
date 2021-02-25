import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../services/auth.guard';

const childrenRoutes : Routes = [
  {
    path: '', 
    component: DashboardComponent,
    children: dashboardRoutes,
    //canActivate: [ AuthGuard ]
  }
] 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( childrenRoutes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
