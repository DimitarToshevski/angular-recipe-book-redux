import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate  {
  constructor (private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.select('auth').pipe(map((authState: fromAuth.State) => {
      if (!authState.isAuthenticated) {
        this.router.navigate(['/signin']);
      }
      return authState.isAuthenticated;
    }));
  }
}
