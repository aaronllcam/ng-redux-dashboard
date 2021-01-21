import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { User } from './../models/user.model';
import * as authActions from './../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener(){
    //Recuperamos toda la informacion del usuario.
    //Llamamos en esta funcion en el app.component, ya que el app.component se llama en todas laas vistas
    this.auth.authState.subscribe( (firebaseUser) => {
      if(firebaseUser){
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/usuario`).valueChanges()
                                    .subscribe( ({ uid, name, email }) => {
                                      const user = new User(uid, name, email);
                                      this.store.dispatch(authActions.setUser({ user }));
                                    });
      }else{
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  createUser(name: string, email: string, pass: string){
    return this.auth.createUserWithEmailAndPassword(email, pass)
            .then( ({ user }) => {
              const newUser = new User(user.uid, name, user.email) 

              return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser })
              //ahora posteamos esta informacion en firerstore cloud database
            });
  }

  login(email: string, pass: string){
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( firebaseUser => firebaseUser != null)
    )
  }
}
