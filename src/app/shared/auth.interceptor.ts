import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor ( private store: Store<fromApp.AppState> ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
    .pipe(take(1)) // take the value of selected state(auth) just once so if changes occur we dont send another req
    .pipe( switchMap( (authState: fromAuth.State ) => {
      // the map will take the observable and wrap it in another observable
      // the switchMap will get the observable and return new observable by switching the old one with the new one
      // if we want to return multiple observables as one object we use mergeMap

      const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
      return next.handle(copiedReq);

      }

    ) );
  }
}
