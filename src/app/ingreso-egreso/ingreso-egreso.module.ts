import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SortIngresoTypePipe } from '../pipes/sort-ingreso-type.pipe';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    DashboardComponent,
    SortIngresoTypePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule
  ]
})
export class IngresoEgresoModule { }
