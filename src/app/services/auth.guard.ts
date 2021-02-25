import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(  private authService: AuthService,
                private router: Router){}
  
  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
      .pipe(
        tap( state => {
          if(!state) this.router.navigate(['/login'])
        })
    );
  }

  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
      .pipe(
        tap( state => {
          if(!state) this.router.navigate(['/login'])
        }),
        take(1) //ponemos el take porque necesitamos para que funcione que el canLoad tenga finalizada la suscripcion al observable, y con take coge el elmento y completa la suscripcion y fuerza un unsubacribe internamente
    );
  }
  
}
