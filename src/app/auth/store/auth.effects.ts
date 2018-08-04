import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  @Effect() // it marks the property below and will execute the code on the right of it
  authSignup;

  constructor (private actions$: Actions) {} // propery marked with $ to say its an observable
}
