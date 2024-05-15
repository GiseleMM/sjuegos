import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
interface Tarjeta {
  original: string,
  nombre: string,
  cords: string[]
}
@Component({
  selector: 'app-mijuego',
  standalone: true,
  imports: [NgClass],
  templateUrl: './mijuego.component.html',
  styleUrl: './mijuego.component.css'
})
export class MijuegoComponent implements OnInit{ tarjetaActual!: Tarjeta;
  gif:boolean|null=null;
revelar=false;
puntaje = 0;
game: any;
audio!: HTMLAudioElement;
mezcla!: number[];
tarjetas: any;
encontro = false;
nivel = 0;
time = 11;
mensaje = "";
diferencias = 0;
diferenciasTotal: number = 0;
jugando = false;
ngOnInit(): void {
  this.tarjetas = this.getTarjetas();
  this.mezcla = this.mezclar([0, 1, 2]);
  console.log("mezcla" + this.mezcla);
  console.log(this.tarjetas);
  let seleccionada = this.tarjetas[this.mezcla[this.nivel]];
  this.nivel++;
  console.log(seleccionada);

  this.tarjetaActual = seleccionada as Tarjeta;
  this.diferenciasTotal = this.tarjetaActual.cords.length;

}
onClikDifente(indice: number) {
  let aux = [];
  //quito de la lista de cordenadas
  for (let index = 0; index < this.tarjetaActual.cords.length; index++) {
    if (indice != index) {
      const element = this.tarjetaActual.cords[index];
      aux.push(element);
    }

  }
  //actualizo  tarjeta con cordenadas
  this.tarjetaActual.cords = aux;
  // aumento diferencia
  this.diferencias++;
  if (this.diferencias == this.diferenciasTotal) {
    this.mensaje = "Felicides Ganaste !!!";
    this.gif=true;
    if (this.nivel < 3) {
      this.encontro=true;
      // setTimeout(() => this.reiniciar(true), 4000);

    } else {
      this.encontro=true;
      this.mensaje = "Felicidades haz superado Todos los niveles !!!";
      this.jugando = true;
      this.gif=true;
    }
  } else {
    this.mensaje = "YEAH sigue buscando diferencias "
    this.puntaje += 100;
    this.gif=true;
    setTimeout(()=>{
      this.mensaje = ""
      this.gif=null;

    },1500);
  }

}
reiniciar(gano: boolean = false) {
console.log("REINICIAR gano:"+gano)
  this.time = 11;
  this.mensaje = "";
  this.diferencias = 0;
  this.revelar=false;
  this.gif=null;

  if (gano) {

    // this.tarjetas=this.getTarjetas();
    if (this.nivel < 3) {
      this.jugando = false;
      this.encontro=false;
      let seleccionada = this.tarjetas[this.mezcla[this.nivel]];
      this.nivel++;
      this.tarjetaActual = seleccionada as Tarjeta;

      this.diferenciasTotal = this.tarjetaActual.cords.length;
    }else
    {
      this.nivel=0;
      this.jugando = false;
      this.encontro=false;
      this.tarjetas = this.getTarjetas();
      
      let mezcla = this.mezclar([0, 1, 2]);
      let seleccionada = this.tarjetas[mezcla[this.nivel]];
      this.tarjetaActual = seleccionada as Tarjeta;

      this.diferenciasTotal = this.tarjetaActual.cords.length;
    }

  } else {

    this.puntaje = 0;
    this.nivel = 0;
    let mezcla = this.mezclar([0, 1, 2]);
    //se vuelve a mezclar
    this.tarjetas = this.getTarjetas();

    let seleccionada = this.tarjetas[mezcla[this.nivel]];
    this.tarjetaActual = seleccionada as Tarjeta;

    this.diferenciasTotal = this.tarjetaActual.cords.length;
    this.jugando = false;
  }

}
iniciar() {
  this.reproducirSonido();
  this.revelar=true;
  this.jugando = true;
  let contador = setInterval(() => {

  
    this.time--;
    if (this.time <= 0) {
      this.time = 1;
      // this.jugando = false;
      this.mensaje = "Game over";
      clearInterval(contador);
      this.pausarSOnido();
      setTimeout(() => this.reiniciar(), 4000);

    }
    //si se encontro
    if (this.encontro) {
      this.pausarSOnido();//pauso
      clearInterval(contador);
 
      setTimeout(() => this.reiniciar(true), 4000);

    }
  }, 1000);
}




private mezclar(lista: Array<number>) {

  let lista_mezclada = [];
  let lista_original = lista.slice();//copiamos lista original
  while (lista_original.length > 0) {

    let posicion = Math.floor(Math.random() * lista_original.length);
    let elemento = lista_original.splice(posicion, 1)[0];//quita desde una posicion un elemento y lo convierte en array ,agarramos ese elemento

    lista_mezclada.unshift(elemento);//agramos lista
  }
  return lista_mezclada;
}
private getTarjetas(): Tarjeta[] {
  return [
    {
      original: "dif12.png",
      nombre: "diferencia1.png",
      cords: ["248,16,142,164", "16,334,165,212", "142,442,80,344", "149,335,251,449"]
    },
    {
      original: "dif12.png",
      nombre: "diferencia2.png",
      cords: ["139,122,251,273", "69,448,0,328", "14,105,110,185"]
    },
    {
      original: "dif3.png",
      nombre: "diferencia3.png",
      cords: ["36,45,145,145", "132,18,242,60", "211,191,168,147"]
    }
  ];

}
reproducirSonido() {

  // Si no está en reproducción, reproducirlo
  this.audio = new Audio();
  this.audio.src = 'assets/diferencias/clock.mp3';
  this.audio.load();
  this.audio.play();
}

pausarSOnido() {
  if (this.audio && !this.audio.paused) {
    // Si el sonido está en reproducción, detenerlo
    this.audio.pause();
    this.audio.currentTime = 0; // Reiniciar el tiempo de reproducción al inicio
  }

}

}




