import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Membre } from '../models/membre.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  private dbMembre ='/membre'
  membreRef: AngularFirestoreCollection <Membre>;

      constructor(
        private db3:AngularFirestore,
        public afs: AngularFirestore, // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning

      ) { 
        this.membreRef   = db3.collection(this.dbMembre);
          /* Saving user data in localstorage when  logged in and setting up null when logged out */
        this.afAuth.authState.subscribe((user) => {
              if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user')!);
              } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user')!);
              }
          });


      }//fin du constructeur

        // Sign in with email/password (Connexion)
  SignIn(membre:Membre) {
    return this.afAuth .signInWithEmailAndPassword(membre.email!, membre.password!)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


   // Sign up with email/password (s'enregistrer)
   SignUp(membre:Membre) {
    return this.afAuth
      .createUserWithEmailAndPassword(membre.email!, membre.password!)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        console.log(result);
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.createMembre(membre);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }



  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {   
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    console.log("je suis la ")
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log('userRef')
    console.log(userRef)
    const userData: Membre = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
  
    console.log('enregistrement ok');
    return userRef.set(userData, { merge: true,});
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
      return this.afAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['verify-email-address']);
        });
    }

    createMembre(membre: Membre): any {
      return this.membreRef.add({ ...membre });
    }



}
