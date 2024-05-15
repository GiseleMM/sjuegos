import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private firestore: Firestore) {

  }
  addRegistro(mail: string) {
    console.log("registro");
    let user = {
      email: mail,
      fecha: this.getFecha()
    }
    console.log(user);
    let col = collection(this.firestore, "registros");
    addDoc(col, user)
    //     .then(r=>{
    //       console.log("true");
    //       return true;
    //     }).catch(e=>{
    //       console.log("false");
    // return false;
    //     }
    //   );

  }
  addLogin(mail: string) {
    let user = {
      email: mail,
      fecha: this.getFecha()
    }
    let col = collection(this.firestore, "logins");
    addDoc(col, user);

  }





  private getFecha(): string {


    let fechaActual = new Date();

    // Obtener los componentes de la fecha
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por lo que necesitas sumar 1
    let anio = fechaActual.getFullYear();
    let hora = fechaActual.getHours();
    let minuto = fechaActual.getMinutes();
    let segundos = fechaActual.getSeconds()



    // Construir la fecha en el formato deseado 08/05/2006 03:05:15
    let fechaFormateada = `${dia}/${mes}/${anio} ${hora}:${minuto}:${segundos}`;
    return fechaFormateada;
  }
  addMensaje(uid: string, mail: string, texto: string) {
    let mensaje = {
      uid: uid,
      mail: mail,
      texto: texto,
      fecha: this.getFecha()
    }
    let col = collection(this.firestore, "mensajes");
    addDoc(col, mensaje);
  }
  getMensajes(): Observable<any> {
    let col = collection(this.firestore, "mensajes");
    //fijarse
    // const q =  query(col, orderBy("fecha")); 
    return collectionData(col);
  }



}
