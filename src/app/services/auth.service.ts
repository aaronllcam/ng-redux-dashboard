import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  createUser(name: string, email: string, pass: string){
    return this.auth.createUserWithEmailAndPassword(email, pass);
  }

  login(email: string, pass: string){
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  logout(){
    return this.auth.signOut();
  }
}
