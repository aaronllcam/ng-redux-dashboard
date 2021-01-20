import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(  private fb: FormBuilder,
                private _authService: AuthService,
                private router: Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      user  : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      pass  : ['', Validators.required]
    });
  }

  createUser(){
    
    if(this.registerForm.invalid) return;

    const {user, email, pass } = this.registerForm.value;
    this._authService.createUser(user, email, pass)
        .then(credenciales => {
          this.router.navigate(['/']);
        })
        .catch(console.log);
   }

}
