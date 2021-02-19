import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from './../app.reducer';
import { AuthService } from './auth.service';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  deleteIngresoEgreso( uidItem: string ){
    ///0rOf1bDCTCXIiuwDgLdPGWIH8wR2/ingresos-egresos/items/Ay2yxbLjUiIoZU6LZfU1
    this.userSubscription = this.store.select('auth').subscribe( ({user}) => this.uid = user.uid);
    this.userSubscription.unsubscribe();

    return this.firestore.doc(`${this.uid}/ingresos-egresos/items/${uidItem}`).delete();

  }

  initIngresosEgresosListener(uid: string){
    //REcuperar los diferentes items de ingreso-egreos de firebase
    //necesitamos pasarle el uid del usuaruio con el que estamos logueados.
    //Por lo tanto esta funcion la podemos poner en el dashboard component
    //Tratandola con el ngOninit y con el ngOnDestroy
    //1 - con valueChanges()
    /*
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
            .valueChanges({idfield: 'uid'}) //el uid me coge el del usuario
            .pipe(
              map( items => items.map(doc => ({
                  uid,
                  ...doc as any
                }))
              )
            )
            //.subscribe();
      */

    //2 - con snapshotChanges()
    
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
            .snapshotChanges() //el uid me coge el de cada item
            .pipe(
              map( snapshot => snapshot.map(doc => ({
                  uid: doc.payload.doc.id,
                  ...doc.payload.doc.data() as any 
                }))
              )
            )
            //.subscribe();
    

  }
}
