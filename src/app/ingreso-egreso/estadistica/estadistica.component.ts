import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from './../../app.reducer';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  totalIngresos       : number = 0;
  totalEgresos        : number = 0;
  totalSubscription$  : Subscription;

  howManyIngresos : number;
  howManyEgresos  : number;

  public doughnutChartLabels  : Label[]     = ['Egresos', 'Ingresos'];
  public doughnutChartData    : MultiDataSet;
  public doughnutChartType    : ChartType   = 'doughnut';
  
  //inyectamos AppStateWithIngreso por el tema del lazy load, ya que en la propiedad en el appstate original no estaria disponoble por el tema del lazy load
  constructor(private store: Store<AppStateWithIngreso>) { }

  ngOnInit(): void {
    this.totalSubscription$ = this.store.select('ingresosEgresos')
    .pipe(
      map(({items}) => {
        if(items.length != 0){
          this.totalIngresos = items.filter( item => item.tipo === 'ingreso').map(arr => arr.monto).reduce((a,b) => a+b);
          this.totalEgresos = items.filter( item => item.tipo === 'egreso').map(arr => arr.monto).reduce((a,b) => a+b);
          this.howManyIngresos = items.filter( item => item.tipo === 'ingreso').length;
          this.howManyEgresos = items.filter( item => item.tipo === 'egreso').length;
          this.doughnutChartData = [[this.totalEgresos, this.totalIngresos]];
        }
        return  { 
                  totalIngresos: this.totalIngresos,
                  totalEgresos: this.totalEgresos
                }
        
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.totalSubscription$.unsubscribe();
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
