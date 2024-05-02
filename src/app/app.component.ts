import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './servicios/auth.service';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'sjuegos';

navs:object[]=[];
  currentUserMail:string|null=null;

  constructor(private authservice:AuthService){}

  ngOnInit(): void {
    console.log("LogINIT");
    console.log(this.currentUserMail);
  // Observa el estado de autenticación del usuario
   this.authservice.auth.onAuthStateChanged(user => {
    // Actualiza el valor de currentUserEmail
    this.currentUserMail = user ? user.email : null;
  });
   

   
  }

  

}
