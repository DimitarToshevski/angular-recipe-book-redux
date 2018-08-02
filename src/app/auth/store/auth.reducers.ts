import { Action } from '@ngrx/store';

export interface State {
  token: string;
  isAuthenticated: boolean;
}

const initialState: State = {
  token: null,
  isAuthenticated: false
};

export function authReducers(state =  initialState, action: Action) {

}
