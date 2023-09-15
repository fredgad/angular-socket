import { Injectable, signal } from '@angular/core';
import { getDatabase } from 'firebase/database';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { map } from 'rxjs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public isAuthenticated$i = signal(true); // Flag to track user authentication state
  // public app!: any;
  // public db!: any;
  // public auth!: any;

  public fireStoreTextsOne$ = this.firestore
    .collection('textOne')
    .valueChanges()
    .pipe(map((data: any) => data[0].value));

  public fireStoreTextsTwo$ = this.firestore
    .collection('textTwo')
    .valueChanges()
    .pipe(map((data: any) => data[0].value));

  private fireStoreTextsOne = '';
  private fireStoreTextsTwo = '';

  constructor(private firestore: AngularFirestore) {}

  public init(): void {
    this.fireStoreTextsOne$.subscribe((data) => {
      this.fireStoreTextsOne = data;
    });
    this.fireStoreTextsTwo$.subscribe((data) => {
      this.fireStoreTextsTwo = data;
    });
    this.fireStoreTextsClear();
  }

  public fireStoreTextsClear() {
    const docRef = this.firestore.collection('textOne').doc('10');
    const docRef2 = this.firestore.collection('textTwo').doc('10');

    const updatedData = {
      value: '',
    };

    docRef
      .update(updatedData)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
    docRef2
      .update(updatedData)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  }

  public fireStoreTextsUpdate(
    newText: string | null,
    textNumber: number
  ): void {
    let val =
      newText === null
        ? this.fireStoreTextsOne.slice(0, -1)
        : this.fireStoreTextsOne + newText;

    let document = 'textOne';

    if (textNumber === 2) {
      document = 'textTwo';
      val =
        newText === null
          ? this.fireStoreTextsTwo.slice(0, -1)
          : this.fireStoreTextsTwo + newText;
    }

    const updatedData = {
      value: val,
    };
    console.log(val, 'document');
    const docRef = this.firestore.collection(document).doc('10');
    // Update the document
    docRef
      .update(updatedData)
      .then(() => {
        // console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  }

  dbAdd(data: any): void {
    const collectionRef = this.firestore.collection('textOne');

    // Add the data to Firestore
    collectionRef
      .add(data)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  // Simulate user login
  login(username: string, password: string): boolean {
    // In a real application, you would make an API call to validate the user's credentials
    // For simplicity, let's assume a predefined username and password for this example
    if (username === 'user' && password === 'password') {
      this.isAuthenticated$i.set(true);
      return true;
    }
    return false;
  }

  // // Check if a user is signed in
  // const user = auth.currentUser;

  // // Listen for changes in the user's authentication state
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in
  //   } else {
  //     // User is signed out
  //   }
  // });

  // Log the user out
  public logout(): void {
    this.isAuthenticated$i.set(false);
  }
}
