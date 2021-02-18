import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';
import { AuthService } from './auth.service';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  
  userSubscription : Subscription;
  uid: string;

  constructor(  private firestore   : AngularFirestore,
                private authService : AuthService,
                private store       : Store<AppState>) { }


  createIngresoEgreso( ingresoEgreso: IngresoEgreso){
    
    this.userSubscription = this.store.select('auth').subscribe( ({user}) => this.uid = user.uid);
    this.userSubscription.unsubscribe();

    return this.firestore.doc(`${this.uid}/ingresos-egresos`)
                  .collection('items')
                  .add( { ...ingresoEgreso } ) ;
  }
}
