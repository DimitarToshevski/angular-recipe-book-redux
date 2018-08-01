import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCCOjGQbYIZ7uXb1cHcm_VQruYdVtmI02Q',
      authDomain: 'angular-recipe-book-482dc.firebaseapp.com'
    });
  }
}
