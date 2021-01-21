import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  initAuthListener(){
    //Recuperamos toda la informacion del usuario.
    //Llamamos en est funcion en el app.component, ya que el app.component se llama en todas laas vistas
    this.auth.authState.subscribe( firebaseUser => {
      console.log(firebaseUser)
      console.log(firebaseUser?.uid)
      console.log(firebaseUser?.email)
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
