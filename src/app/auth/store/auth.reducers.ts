import { Action } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

export interface State {
  token: string;
  isAuthenticated: boolean;
}

const initialState: State = {
  token: null,
  isAuthenticated: false
};

export function authReducers(state =  initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        isAuthenticated: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
