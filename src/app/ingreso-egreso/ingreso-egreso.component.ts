import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';
import * as actions from './../shared/ui.actions';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  uiSubscription : Subscription;
  ingresoForm    : FormGroup;
  isIngreso      : boolean = true;
  loading        : boolean = false;

  constructor(  private fb: FormBuilder,
                private ingresoEgresoService: IngresoEgresoService,
                private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description : ['', Validators.required],
      monto : ['', Validators.required]
      //type : ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  save(){

    if(this.ingresoForm.invalid) return;

    this.store.dispatch(actions.isLoading());

    const {description, monto} = this.ingresoForm.value;
    const type: string = this.isIngreso ? "ingreso" : "egreso";

    const ingresoEgreso : IngresoEgreso = new IngresoEgreso(description, monto, type);
    //createIngresoEgreso

    this.ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
                              .then( res => {
                                this.store.dispatch(actions.stopLoading());
                                this.ingresoForm.reset();
                                Swal.fire({
                                  title: 'Registro creado',
                                  text: description,
                                  icon: 'success'
                                })
                              })
                              .catch( err => {
                                Swal.fire({
                                  title: 'Error!',
                                  text: err.message,
                                  icon: 'error',
                                  confirmButtonText: 'Aceptar'
                                })
                              });



  }

  cancel(){
    this.store.dispatch(actions.stopLoading());
    this.ingresoForm.reset();
  }

}
