import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

  private http=inject(HttpClient);
  private api="https://clientes.api.greenborn.com.ar/public-random-word?c=1";
  constructor() { }
  
  getPalabra():Observable<any>
  {
    return this.http.get(this.api);
  }
}
