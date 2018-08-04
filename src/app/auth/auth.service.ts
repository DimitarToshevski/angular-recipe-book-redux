// Here we use store and dispatching actions in the then() block of the promises where we reach out firebase
// Changed this way with the angular Effects way

// import { Router } from '@angular/router';
// import { Injectable } from '@angular/core';

// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import { Store } from '@ngrx/store';
// import * as fromApp from '../store/app.reducers';
// import * as AuthActions from './store/auth.actions';

// @Injectable()
// export class AuthService {

//   constructor(private router: Router, private store: Store<fromApp.AppState>) {}
//   signupUser(email: string, password: string) {
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then(
//         user => {
//           this.store.dispatch(new AuthActions.Signup());
//           firebase.auth().currentUser.getIdToken()
//         .then( (token: string) => {
//           this.store.dispatch(new AuthActions.SetToken(token));
//         });
//         }
//       )
//       .catch(
//         error => console.log(error)
//       );
//   }

//   signinUser(email: string, password: string) {
//     firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(response => {
//       this.store.dispatch(new AuthActions.Signin());
//       this.router.navigate(['/']);
//       firebase.auth().currentUser.getIdToken()
//         .then( (token: string) => {
//           this.store.dispatch(new AuthActions.SetToken(token));
//         });
//     })
//     .catch(
//       error => console.log(error)
//     );
//   }

//   logoutUser() {
//     firebase.auth().signOut();
//     this.router.navigate(['/']);
//   }
// }
