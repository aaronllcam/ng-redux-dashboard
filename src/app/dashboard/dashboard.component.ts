import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { AppState } from './../app.reducer';
import { filter } from 'rxjs/operators';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription              : Subscription;
  ingresosEgresosSubscripction  : Subscription;

  constructor(  private ingresoEgresoService: IngresoEgresoService,
                private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(
        filter( ({user}) => user != null )
      )
      .subscribe( ({user}) => {
        this.ingresosEgresosSubscripction = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
          .subscribe( ingresosEgresos => {
            this.store.dispatch(ingresoEgresoActions.setItems({items: ingresosEgresos}))
          });
      } );
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscripction.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
