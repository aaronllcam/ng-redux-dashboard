import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  authSubscription$ : Subscription;
  userName: string;

  constructor(private _authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authSubscription$ = this.store.select('auth')
      .pipe(
        filter( ({user}) => user != null)
      )
      .subscribe( ({ user }) => this.userName = user.name);

  }
  ngOnDestroy(): void {
    this.authSubscription$.unsubscribe();
  }

  logout(){
    Swal.fire({
      title: 'Cerrando Sesión',
      timerProgressBar: true,
      didOpen:() => {
        Swal.showLoading()
      }
    });
    this._authService.logout()
                      .then( () => {
                        Swal.close();   
                        this.router.navigate(['/login'])
                      })
                      .catch( err => {
                        Swal.fire({
                          title: 'Error!',
                          text: err.message,
                          icon: 'error',
                          confirmButtonText: 'Aceptar'
                        })
                      });
  }

}
