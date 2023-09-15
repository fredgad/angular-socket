import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBzhCu5nydmuXHuwgnTpR-1gn2Ef7KY7oA',
  authDomain: 'angular-socket-b8c71.firebaseapp.com',
  databaseURL:
    'https://angular-socket-b8c71-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'angular-socket-b8c71',
  storageBucket: 'angular-socket-b8c71.appspot.com',
  messagingSenderId: '97236337184',
  appId: '1:97236337184:web:c291009263610b2d2eb245',
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    ),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
