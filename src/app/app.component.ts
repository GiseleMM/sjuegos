import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './servicios/auth.service';
import { Unsubscribe, User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { ChatComponent } from './componenetes/chat/chat.component';
import { ChatroomComponent } from './componenetes/chatroom/chatroom.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ChatComponent,ChatroomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sjuegos';
  unsubscript!: Unsubscribe;
  subscipcion!: Subscription;

  navs: object[] = [];
  currentUserMail: string | null = null;

  constructor(private authservice: AuthService) { }
  ngOnDestroy(): void {
    if (this.unsubscript != null) {
      this.unsubscript();

    }
    this.subscipcion.unsubscribe();

  }

  ngOnInit(): void {
    console.log("LogINIT");
    console.log(this.currentUserMail);
    // // Observa el estado de autenticación del usuario
    //  this.unsubscript=this.authservice.auth.onAuthStateChanged(user => {
    //   // Actualiza el valor de currentUserEmail
    //   this.currentUserMail = user ? user.email : null;
    // });

    this.authservice.getUser().subscribe(usuario => {
      this.currentUserMail = usuario ? usuario.email : null;
    }
    );

  }



}
