import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from './usuario';

@Injectable()
export class auth {

  constructor(private angularFireAuth: AngularFireAuth) { }

  cadastrar(user: Usuario) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(user: Usuario) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOut() : Promise<any> {
    return this.signOutFirebase();
  }

  private signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }
}