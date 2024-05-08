import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})
export class MayormenorComponent implements OnInit {
  jugar=false;
  private cartas: string[] = [];
  mensaje: string = "";
  errores: number = 0;
  private cartasMezcladas: string[] = [];
  carta = "";
  cartaOculta = "";
  numero: number = 0;
  numeroProximo: number = 0;
  puntos: number = 0;
  posicion = 0;
  ngOnInit(): void {
    this.jugar=true;
    //mezclo random
    this.cartas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
    this.cartasMezcladas = this.mezclar(this.cartas);

    this.carta = this.cartasMezcladas[this.posicion];
    this.numero = Number(this.cartasMezcladas[this.posicion]);
    this.cartaOculta = this.cartasMezcladas[this.posicion + 1];

    this.numeroProximo = Number(this.cartasMezcladas[this.posicion + 1]);
  }
  mayor() {
    this.posicion += 2;
    const imagen = document.getElementsByClassName("ofuscar")[0] as HTMLElement;
    if (imagen != null) {
      imagen.className = "revelar";
      console.log(this.numero);
      console.log(this.numeroProximo);

      if (this.numero < this.numeroProximo) {
        this.puntos += 100;
        // alert("ganaste 100puntos");
        this.mensaje="Ganaste 100 puntos🤗🎉";
      } else {
        // alert("NO :(");
        this.mensaje="No es mayor 😪😔";

        this.errores++;

      }

    }
    setTimeout(() => this.next(this.posicion), 2000);

  }
  menor() {
    this.posicion += 2;
    const imagen = document.getElementsByClassName("ofuscar")[0] as HTMLElement;
    if (imagen != null) {
      imagen.className = "revelar";
      console.log(this.numero);
      console.log(this.numeroProximo);

      if (this.numero > this.numeroProximo) {
        this.puntos += 100;
        // alert("ganaste 100puntos");
        this.mensaje="Ganaste 100 puntos🤗🎉";
      } else {
        // alert("NO :(");
        this.mensaje="No es menor 😪😔";
        this.errores++;
      }
    }
    this.jugar=false;
    setTimeout(() => this.next(this.posicion), 2000);

  }
  private mezclar(lista: Array<string>) {

    let lista_mezclada = [];
    let lista_original = lista.slice();//copiamos lista original
    while (lista_original.length > 0) {

      let posicion = Math.floor(Math.random() * lista_original.length);
      let elemento = lista_original.splice(posicion, 1)[0];//quita desde una posicion un elemento y lo convierte en array ,agarramos ese elemento

      lista_mezclada.unshift(elemento);//agramos lista
    }
    return lista_mezclada;
  }
  private next(oculta: number) {
    console.log("oculta" + oculta);
    console.log("cartas" + this.cartas.length);
    this.mensaje="";

    this.jugar=true;
    if (this.errores < 3) {
      if (oculta < this.cartas.length) {

        this.carta = this.cartasMezcladas[oculta];
        this.numero = Number(this.cartasMezcladas[oculta]);

        this.cartaOculta = this.cartasMezcladas[oculta + 1];
        this.numeroProximo = Number(this.cartasMezcladas[oculta + 1]);
        const imagen = document.getElementsByClassName("revelar")[0] as HTMLElement;
        if(imagen!=null)
          {
            imagen.className = "ofuscar";

          }
      } else {

        this.mensaje = "Ganaste " + this.puntos + " puntos Felicidades!!!";
      setTimeout(() => this.reiniciar(), 3000);

      }

    } else {
      this.mensaje = "Perdiste la partida . Vuelve a internarlo";
      setTimeout(() => this.reiniciar(), 3000);
    }


  }
  reiniciar() {
    
    this.mensaje = "";
    this.errores = 0;
    this.puntos = 0;
    this.posicion=0; 
    
    this.cartasMezcladas = this.mezclar(this.cartas);
    
    this.carta = this.cartasMezcladas[this.posicion];
    this.numero = Number(this.cartasMezcladas[this.posicion]);
    this.cartaOculta = this.cartasMezcladas[this.posicion + 1];
    this.numeroProximo=Number(this.cartasMezcladas[this.posicion+1]);
    const imagen = document.getElementsByClassName("revelar")[0] as HTMLElement;
    if(imagen!=null)
      {
        imagen.className="ofuscar";
      }

    console.log(this.carta);
    console.log(this.numero);
    console.log(this.cartaOculta);
    console.log(this.numeroProximo);



  }

}



