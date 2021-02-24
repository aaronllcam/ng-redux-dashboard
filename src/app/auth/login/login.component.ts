<<<<<<< HEAD
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as actions from './../../shared/ui.actions';
import Swal from 'sweetalert2'
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 28d8168230e6474ea294fa274c278fe74734954b

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
<<<<<<< HEAD
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(  private fb: FormBuilder,
                private _authservice: AuthService,
                private store: Store<AppState>,
                private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      pass  : ['', Validators.required] 
    });
    
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void{
    this.uiSubscription.unsubscribe();
  }

  login(){
    if(this.loginForm.invalid) return;
    this.store.dispatch(actions.isLoading())
    // Swal.fire({
    //   title: 'Espere por favor!',
    //   timerProgressBar: true,
    //   didOpen:() => {
    //     Swal.showLoading()
    //   }
    // });
    const {email, pass} = this.loginForm.value;
    this._authservice.login(email, pass)
                      .then( login => {
                        // Swal.close();
                        this.store.dispatch(actions.stopLoading());
                        this.router.navigate(['/']);
                      })
                      .catch(err => {
                        this.store.dispatch(actions.stopLoading());
                        Swal.fire({
                          title: 'Error!',
                          text: err.message,
                          icon: 'error',
                          confirmButtonText: 'Aceptar'
                        })
                      });

=======
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
>>>>>>> 28d8168230e6474ea294fa274c278fe74734954b
  }

}
