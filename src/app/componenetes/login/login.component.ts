import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  mail: string = '';
  clave: string = '';
  loginUser: string | null = null;
  currentUser:string|null=null;
  // constructor(public auth:Auth){}
  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authservice.getCurretUser()?.email ?? null;
  }

  login() {
    console.log("funciona login");
    if(this.mail!=null && this.clave!=null && this.mail.trim().length>0 && this.clave.trim().length)
      {
         // signInWithEmailAndPassword(this.auth,this.mail,this.clave)
    this.authservice.iniciarSesion(this.mail, this.clave)
    .then(res => {
      this.loginUser = res.user.email ?? "";
      this.router.navigateByUrl("home");
    })
    .catch(e => this.loginUser = e.code);

      }else
      {
        this.loginUser="Debe completar campos";
      }
   
  }
  mostrarClave(evento: Event) {
    //let input = evento.target as HTMLButtonElement;

    const input_clave = document.getElementById("txtclave") as HTMLInputElement;

    if (input_clave.type == "text") {
      input_clave.type = "password";

    } else {
      input_clave.type = "text";

    }

  }
  logout() {
    this.authservice.cerrarSesion().then(() => {
      this.router.navigateByUrl("/home");
    });
  }
  autocomplete()
  {
    let usuarios=[
    {mail:"gulmofotre@gufum.com",
      clave:"123456Leal"
    },
    {mail:"martapifyi@gufum.com",
      clave:"123456Test"
    }
    ]
    this.mail=usuarios[0].mail;
    this.clave=usuarios[0].clave;
  }
}
