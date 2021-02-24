<<<<<<< HEAD
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import * as actions from './../../shared/ui.actions';
import Swal from 'sweetalert2';


=======
import { Component, OnInit } from '@angular/core';
>>>>>>> 28d8168230e6474ea294fa274c278fe74734954b

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
<<<<<<< HEAD
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  uiSubscription: Subscription;
  loading: boolean = false;

  constructor(  private fb: FormBuilder,
                private _authService: AuthService,
                private store: Store<AppState>,
                private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      user  : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      pass  : ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser(){
    
    if(this.registerForm.invalid) return;
    this.store.dispatch(actions.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor!',
    //   timerProgressBar: true,
    //   didOpen:() => {
    //     Swal.showLoading()
    //   }
    // });
    const {user, email, pass } = this.registerForm.value;
    this._authService.createUser(user, email, pass)
                      .then(credenciales => {
                        this.store.dispatch(actions.stopLoading());
                        // Swal.close();
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
                      })
=======
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
>>>>>>> 28d8168230e6474ea294fa274c278fe74734954b
  }

}
