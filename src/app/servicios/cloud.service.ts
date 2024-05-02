import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(private firestore:Firestore) {

   }
   addRegistro(mail:string)
   {
    let user={
      email:mail,
      fecha:this.getFecha()
    }
    let col=collection(this.firestore,"registros");
    addDoc(col,user);
  
   }
   addLogin(mail:string)
   {
    let user={
      email:mail,
      fecha:this.getFecha()
    }
    let col=collection(this.firestore,"logins");
    addDoc(col,user);

   }





   private getFecha():string
   {

   
   let fechaActual = new Date();

// Obtener los componentes de la fecha
let dia = fechaActual.getDate();
let mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por lo que necesitas sumar 1
let anio = fechaActual.getFullYear();



// Construir la fecha en el formato deseado
let fechaFormateada = `${dia}/${mes}/${anio}`;
return fechaFormateada;
}
}
