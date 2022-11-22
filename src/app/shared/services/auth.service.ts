import { Injectable, NgZone } from '@angular/core';

import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from './firebase-code-error.service';
import { ToastrService } from 'ngx-toastr';
import { getAuth, onAuthStateChanged, updateProfile, UserInfo } from 'firebase/auth';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any; // Guardar los datos del usuario
  loading: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastr: ToastrService,
    public FireBaseError: FirebaseCodeErrorService,
  ) {

    // Guardando datos del usuario en el localstorage 

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

  }

  ingresar(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  registrar(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  // Login(email: string, password: string) {
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.SetUserData(result.user);
  //       this.afAuth.authState.subscribe((user) => {
  //         if (user) {
  //           this.router.navigate(['dashboard']);
  //           this.toastr.success('El usuario ha sido logueado exitosamente', 'Usuario registrado');
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
  //     });
  // }


  // Register(email: string, password: string) {
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.SendVerificationMail();
  //       this.SetUserData(result.user);
  //       this.toastr.success('El usuario ha sido registrado exitosamente', 'Usuario registrado');
  //     })
  //     .catch((error) => {
  //       this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
  //       console.log(error)
  //     });
  // }



  SendVerificationMail() {
    this.loading = true;
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.loading = false;
        this.router.navigate(['verificar-email'])
        this.toastr.info('Se ha enviado un correo de verificiacón, por favor revisarlo', 'Correo verficiación');
      });
  }

  olvidarPassword(passwordResetEmail: string) {
    this.loading = true;
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.loading = false;
        this.toastr.info('Se ha enviado un correo para resetear su contraseña', 'Resetear contraseña');
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      });
  }

  get estaLogueado(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  GoogleAuth() {
    this.loading = true;
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.loading = false;
      this.router.navigate(['dashboard']);
      this.toastr.success('El usuario ha sido logueado con Google exitosamente', 'Usuario registrado');
    });
  }

  FacebookAuth() {
    this.loading = true;
    return this.AuthLogin(new auth.FacebookAuthProvider()).then((res: any) => {
      this.loading = false;
      this.router.navigate(['dashboard']);
      this.toastr.success('El usuario ha sido logueado con Facebook exitosamente', 'Usuario registrado');
    });
  }

  TwitterAuth() {
    this.loading = true;
    return this.AuthLogin(new auth.TwitterAuthProvider()).then((res: any) => {
      this.loading = false;
      this.toastr.success('El usuario ha sido logueado con Twitter exitosamente', 'Usuario registrado');
      this.router.navigate(['dashboard']);
    });
  }

  GithubAuth() {
    this.loading = true;
    return this.AuthLogin(new auth.GithubAuthProvider()).then((res: any) => {
      this.loading = false;
      this.toastr.success('El usuario ha sido logueado con GitHub exitosamente', 'Usuario registrado');
      this.router.navigate(['dashboard']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.toastr.error(this.FireBaseError.codeError(error.code), 'Error')
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    })


  }

  signOut() {
    this.loading = true;
    return this.afAuth.signOut().then(() => {
      this.loading = false;
      localStorage.removeItem('user');
      this.toastr.success('Se ha cerrado la sesión correctamente', 'Sesión cerrada');
      this.router.navigate(['login'])

    })
  }



}
