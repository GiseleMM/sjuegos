import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { QuizzService } from '../../servicios/quizz.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
interface QuizzInteface {
  category: string,
  correctAnswers: string,
  format: string,
  id: string,
  incorrectAnswers: string[],
  question: string,

}
@Component({
  selector: 'app-trivia',
  standalone: true,
  imports: [NgClass],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css'
})
export class TriviaComponent implements OnInit, OnDestroy {


  temas=[
    "geo","depor","arte","nat","entret"
  ];
  tema:string="";
  ocultarRespuesta = true;
  selectOption!: number | null;
  quizzService = inject(QuizzService);
  preguntas!: QuizzInteface[];
  posicion = 0;
  currentQuizz!: QuizzInteface;
  currentOptions!: string[];
  puntaje = 0;
  mensaje = "";
  errores = 0;

  sub!: Subscription;
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {

this.obtenerPregunstas();
   


  
}
  getPregunta() {
    console.log("index:" + this.posicion);
    this.currentQuizz = this.preguntas[this.posicion];
    this.posicion++;
    console.log(this.currentQuizz);
    let opciones = this.currentQuizz.incorrectAnswers;
    opciones.push(this.currentQuizz.correctAnswers);
    console.log("index:" + this.posicion);
    this.currentOptions = this.mezclar(opciones);


  }
  enviar() {
    if (this.selectOption != null) {
      let seleccionada = this.currentOptions[this.selectOption];
      if (this.currentQuizz.correctAnswers.trim() == seleccionada) {
        // alert("YEAH ");
        this.puntaje += 100;
        this.mensaje="🎈";
        
        if (this.posicion < this.preguntas.length) {
          this.nextPregunta();

        } else {

          this.mensaje = "😎✨🎈Haz superado todas las preguntas y acumulaste " + this.puntaje + " puntos";

        }

      } else {
        // alert("No es");
        this.errores++;
        if (this.errores < 3) {
          this.ocultarRespuesta = false;
          setTimeout(() => {
            this.nextPregunta();
            this.ocultarRespuesta = true;
          }, 3000);
        } else {
          this.mensaje = "😪¡Tres derrotas! ¡Pero no te rindas! ¡Sigue intentándolo y alcanzarás la victoria!";
          setTimeout(() => {


            this.sub.unsubscribe();
            this.reinciar();
       this.obtenerPregunstas();
          }, 4000);
        }

        //mostrarCorrecta
      }
    } else {
      // alert("debe seleccionar opcion");
      this.mensaje = "👀 debes seleccionar una opcion";

    }

  }

  onChange(e: Event) {
    if (e.target != null)
      console.log(e.target ? (e.target as HTMLInputElement).value : "NULL");
    let str = e.target ? (e.target as HTMLInputElement).value : null;

    this.selectOption = str ? Number(str) : null;
  }
  nextPregunta() {
    //aumenta el option y sigue a la otra
setTimeout(()=>{this.mensaje=""},1500);
    this.getPregunta();
  }
  private reinciar() {
    this.mensaje = "";
    this.puntaje = 0;
    this.ocultarRespuesta=true;
    this.posicion=0;
    this.errores=0;

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


  obtenerPregunstas()
  {
    console.log("Obtener pregusnats");
    let tema=this.mezclar(this.temas)[0];
    console.log("tema"+tema);

    switch(tema)
    {
      case "geo":
        this.sub = this.quizzService.getPreguntasGeografia().subscribe(c => {
          this.preguntas = c.questions;
          console.log(this.preguntas);
          console.log(this.preguntas[0].question);
          this.getPregunta();
        });

        break;
        case "depor":
          this.sub = this.quizzService.getPreguntasDeporteYOcio().subscribe(c => {
            this.preguntas = c.questions;
            console.log(this.preguntas);
            console.log(this.preguntas[0].question);
            this.getPregunta();
          });
          break;
          case "arte":
            this.sub = this.quizzService.getPreguntasArteLiteratura().subscribe(c => {
              this.preguntas = c.questions;
              console.log(this.preguntas);
              console.log(this.preguntas[0].question);
              this.getPregunta();
            });
            break;
            case "nat":
              this.sub = this.quizzService.getPreguntasCienciaYNaturaleza().subscribe(c => {
                this.preguntas = c.questions;
                console.log(this.preguntas);
                console.log(this.preguntas[0].question);
                this.getPregunta();
              });
              break;
              case "entret":
                this.sub = this.quizzService.getPreguntasEntretenimiento().subscribe(c => {
                  this.preguntas = c.questions;
                  console.log(this.preguntas);
                  console.log(this.preguntas[0].question);
                  this.getPregunta();
                });
                break;
                default:
                 
                    this.sub = this.quizzService.getPreguntasGeografia().subscribe(c => {
                      this.preguntas = c.questions;
                      console.log(this.preguntas);
                      console.log(this.preguntas[0].question);
                      this.getPregunta();
                    });
                    break;
    }

  }
}
