import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(  private fb: FormBuilder,
                private _authservice: AuthService,
                private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      pass  : ['', Validators.required] 
    });
    
    
    
  }

  login(){
    if(this.loginForm.invalid) return;
    Swal.fire({
      title: 'Espere por favor!',
      timerProgressBar: true,
      didOpen:() => {
        Swal.showLoading()
      }
    });
    const {email, pass} = this.loginForm.value;
    this._authservice.login(email, pass)
                      .then( login => {
                        Swal.close();
                        this.router.navigate(['/']);
                      })
                      .catch(err => {
                        Swal.fire({
                          title: 'Error!',
                          text: err.message,
                          icon: 'error',
                          confirmButtonText: 'Aceptar'
                        })
                      });

  }

}
