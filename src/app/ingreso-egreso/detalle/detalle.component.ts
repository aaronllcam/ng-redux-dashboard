import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { IngresoEgresoService } from './../../services/ingreso-egreso.service';
import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos          : IngresoEgreso[];
  ingresosEgresosSubscribe : Subscription;

  constructor(private store: Store<AppState>,
              private ingrgesoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosEgresosSubscribe = this.store.select('ingresosEgresos').subscribe( ({ items }) => this.ingresosEgresos = items);
    console.log(this.ingresosEgresos);
  }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscribe.unsubscribe();
  }

  delete(uid: string, idx){
    const registroBorrado: string = this.ingresosEgresos[idx].descripcion;
    this.ingrgesoEgresoService.deleteIngresoEgreso(uid)
      .then(res => {
        Swal.fire({
          title: 'Registro borrado',
          text: registroBorrado,
          icon: 'success'
        })
      })
      .catch(err => {
          Swal.fire({
          title: '¡No se ha podido borrar!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      });
  }

}
