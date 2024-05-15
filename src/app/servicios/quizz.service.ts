import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  
  private key:string=environment.apiKey;
  quizzService = inject(HttpClient);
  constructor() {
  }


  getPreguntasGeografia() {
  //  this.page=Math.floor(Math.random() * (10- 1)) + 1;
  let api: string = "https://api.quiz-contest.xyz/questions?limit=10&page=1&category=geography";    
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.key })
    };
    return this.quizzService.get<any>(api, httpOptions);
  }

  getPreguntasEntretenimiento() {
    let api: string = "https://api.quiz-contest.xyz/questions?limit=10&page=1&category=entertainment";
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.key })
    };
    return this.quizzService.get<any>(api, httpOptions);
  }

  getPreguntasArteLiteratura() {
    let api: string = "https://api.quiz-contest.xyz/questions?limit=10&page=1&category=arts%26literature";
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.key })
    };
    return this.quizzService.get<any>(api, httpOptions);
  }
  getPreguntasCienciaYNaturaleza() {
    let api: string = "https://api.quiz-contest.xyz/questions?limit=10&page=1&category=science%26nature";
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.key })
    };
    return this.quizzService.get<any>(api, httpOptions);
  }
  getPreguntasDeporteYOcio() {
    let api: string = "https://api.quiz-contest.xyz/questions?limit=10&page=1&category=sports%26leisure";
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.key })
    };
    return this.quizzService.get<any>(api, httpOptions);
  }
}