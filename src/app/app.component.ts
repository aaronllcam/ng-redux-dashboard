import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingreso-egreso';

  constructor( private _authService: AuthService){
    //Llamamos en est funcion en el app.component, ya que el app.component se llama en todas laas vistas
    this._authService.initAuthListener();
  }
}
