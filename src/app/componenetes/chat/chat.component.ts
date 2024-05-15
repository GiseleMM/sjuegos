import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { CloudService } from '../../servicios/cloud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  private subcMensaje!: Subscription;
  ngOnDestroy(): void {
    this.subcMensaje.unsubscribe();
  }


  private authservice = inject(AuthService);
  private cloudservice = inject(CloudService);

  mostrarChat = true;
  emailUser: any;
  uidUser: any;

  nuevoMensaje: string = "";
  usuarioLogeado: any;
  mensajes: any[] = [];

  ngOnInit(): void {

    console.log(this.authservice.auth.currentUser);

    this.emailUser = this.authservice.auth.currentUser ? this.authservice.auth.currentUser.email : null;
    this.uidUser = this.authservice.auth.currentUser ? this.authservice.auth.currentUser.uid : null;
    console.log(this.emailUser);
    console.log(this.uidUser);

    this.subcMensaje=this.cloudservice.getMensajes().subscribe(msj => {
      this.mensajes = [];
      this.mensajes = msj ?? [];
      this.mensajes.sort((a:any,b:any)=>{
        let fechaA:any=this.convertirStringAFecha(a.fecha);
        let fechaB:any=this.convertirStringAFecha(b.fecha);
        return fechaA-fechaB;

      })
      console.log(this.mensajes)

    })

    // this.usuarioLoegado=this.auth.GetCurrentUser.subcribe(user=>this.usuarioLogeado=user);
    // this.id=this.authservice.auth.currentUser?this.authservice.auth.currentUser.uid:null;
    // this.emailUser=this.authservice.auth.currentUser?this.authservice.auth.currentUser.email:null;
    // if(this.id!=null)
    //   {

    //     this.usuarioLogeado={uid:this.authservice.auth.currentUser?.uid,mail:this.emailUser};
    //       console.log(this.usuarioLogeado);
    //     };

    //     this.subcMensaje=this.cloudservice.getMensajes().subscribe(c=>{
    //       this.mensajes=[];
    //       this.mensajes=c;
    //     });
    //   }
  }

  enviarMensaje() {

    let m = this.nuevoMensaje;
    this.cloudservice.addMensaje(this.uidUser,this.emailUser,m);
    let mjs = {
      fecha:this.getFecha(),
        uid: this.uidUser,
      mail: this.emailUser,
      texto: m
    }

    this.mensajes.push(mjs);
    this.nuevoMensaje = "";
    setTimeout(() => this.scrollEnd(), 500);


  }
  scrollEnd() {
    let elem = document.getElementsByClassName("msj");
    let ultimo: any = elem[(elem.length - 1)];// el ultimo elemento de los mensaje
    let tp = ultimo.offsetTop;

    const cont = document.getElementById("contenedor-mensaje");
    if (cont != null) {
      cont.scrollTop = tp;
    }
  }

  private convertirStringAFecha(fechaString: string): Date {
    // Dividir el string en partes
    let partes: string[] = fechaString.split(/[\/ :]/);

    // Crear el objeto Date
    // Las partes[1] - 1 es porque los meses en JavaScript son 0-indexados
    let fecha = new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]), Number(partes[3]), Number(partes[4]), Number(partes[5]));

    return fecha;
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
}
