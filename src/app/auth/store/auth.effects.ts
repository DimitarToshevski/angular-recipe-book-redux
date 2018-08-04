import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as AuthAction from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { from } from 'rxjs';

@Injectable()
export class AuthEffects {
  @Effect() // it marks the property below and will execute the code on the right of it
  // an Effect typically returns effect which dispatches action
  // otherwise we put @Effect({dispatch: false}) if we dont want to change state
  authSignup = this.actions$ // checking all of the actions provided by all of the rxjs stores in our app
    .ofType(AuthAction.TRY_SIGNUP) // if anywhere in our app a TRY_SIGNUP action is triggered the code below will execute
    .pipe( map( (action: AuthAction.TrySignup) => { // getting just the payload of the triggered action from the observable
      return action.payload;
    }))
    .pipe( switchMap( ( authData: { username: string, password: string } ) => {
      // using switchMap so inside the passed observable, we invoke a function which also returns an observable
      return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      // passing down the observable that the inner function returns,  by switchng it with the outer observable
    }))
    .pipe( switchMap( () => { // again switching the outer observable with the observable from the function we call inside it
      return from(firebase.auth().currentUser.getIdToken());
    }))
    .pipe( mergeMap( (token: string) => { // now switching the outer observable with multiple observable we want to return
      return [
        { type: AuthAction.SIGNUP },
        {
          type: AuthAction.SET_TOKEN,
          payload: token
        }
      ];
    }));

    @Effect()
    authSingin = this.actions$
    .ofType(AuthAction.TRY_SIGNIN)
    .pipe( map( (action: AuthAction.TrySignup) => { // getting just the payload of the triggered action from the observable
      return action.payload;
    }))
    .pipe( switchMap( ( authData: { username: string, password: string } ) => {
      // using switchMap so inside the passed observable, we invoke a function which also returns an observable
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      // passing down the observable that the inner function returns,  by switchng it with the outer observable
    }))
    .pipe( switchMap( () => { // again switching the outer observable with the observable from the function we call inside it
      return from(firebase.auth().currentUser.getIdToken());
    }))
    .pipe( mergeMap( (token: string) => { // now switching the outer observable with multiple observable we want to return
      this.router.navigate(['/recipes']);
      return [
        { type: AuthAction.SIGNIN },
        {
          type: AuthAction.SET_TOKEN,
          payload: token
        }
      ];
    }));

  constructor (private actions$: Actions, private router: Router) {} // propery marked with $ to say its an observable
}
