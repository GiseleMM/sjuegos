import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PalabraService } from '../../servicios/palabra.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit,OnDestroy{
  teclas: string[] = [];
  palabra: string = "";
  mascara: string = "";
  intentos: number = 0;
sub!:Subscription;
  mensaje: string = "";
  puntaje:number=0;
  desabilitado:boolean=true;
  constructor(private palabraService:PalabraService) {

  }
  ngOnInit(): void {
    this.teclas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    this.sub = this.palabraService.getPalabra().subscribe(palabras => {
      const palabraSinAcentos = palabras[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      console.log(palabraSinAcentos);
      this.palabra = palabraSinAcentos;
      this.enmascarar(palabraSinAcentos);
      this.desabilitado=false;
    }
    );


  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();

  }
  teclaClick(letra: string) {
    // alert(letra);
    console.log(this.palabra);
    console.log(letra.toLowerCase());
    if(this.palabra.includes(letra.toLowerCase()))
      {

        console.log("contine letra "+letra);
        this.revelar(letra.toLocaleLowerCase());
          this.puntaje+=100;
          if(this.palabra.trim()==this.mascara.trim())
            {
              this.mensaje="Felicidades ganaste";
              this.desabilitado=true;
              setTimeout(()=>this.reiniciar(),3000);
            }

      }else
      {
        this.intentos++;
        if (this.intentos == 7) 
          {
            // this.reiniciar();
            this.mensaje = "Game Over";

            this.desabilitado=true;
            this.mascara=this.palabra;//para q mueste la palabra
            setTimeout(()=>this.reiniciar(),3000);
          }

      }
  

  }
  private enmascarar(palabra: string) {
    console.log(palabra);

    for (let index = 0; index < palabra.length; index++) {
      this.mascara = this.mascara.concat("_");
      console.log(this.mascara);
    }

  }
  private revelar(letra:string)
  {
    let i=0;
    let array:number[]=[];
    [...this.palabra].forEach(element => {
      
      if(element==letra)
        {
          array.push(i);
        }
        i++;
    });

    let buffer:string="";
  
    for (let index = 0; index < this.mascara.length; index++) {

      let elemento = this.mascara[index];
      if(array.includes(index))
        {
            elemento=letra;
        }
        buffer=buffer.concat(elemento);

    }
    this.mascara=buffer;
  }
  private reiniciar() {
    this.palabra = "";
    this.mascara="";
    this.intentos=0;
    this.puntaje=0;
    this.mensaje="";
    this.sub.unsubscribe();
    this.sub = this.palabraService.getPalabra().subscribe(
      palabras => {
        const palabraSinAcentos = palabras[0].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log(palabraSinAcentos);
        this.palabra = palabraSinAcentos;
        this.enmascarar(palabraSinAcentos);
        this.desabilitado=false;
      }

    );

  }




}
