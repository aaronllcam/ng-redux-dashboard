import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
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
