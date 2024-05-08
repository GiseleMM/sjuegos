import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged, User, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CloudService } from './cloud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public auth=inject(Auth);
private user$=user(this.auth);

private cloud=inject(CloudService);


  constructor() { }
  iniciarSesion(mail:string,pass:string)
  {
    // this.cloud.addLogin(mail);
    return signInWithEmailAndPassword(this.auth,mail,pass);
  }
  registrar(mail:string,pass:string)
  {
    // this.cloud.addRegistro(mail);
    return createUserWithEmailAndPassword(this.auth,mail,pass);
  }
  cerrarSesion()
  {
    return signOut(this.auth);
  }
getCurretUser()
{
  return this.auth.currentUser;
}

getUser()
{
  return this.user$;
}
}
