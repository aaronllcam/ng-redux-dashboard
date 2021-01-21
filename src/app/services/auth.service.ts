import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

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
    return this.auth.createUserWithEmailAndPassword(email, pass);
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
