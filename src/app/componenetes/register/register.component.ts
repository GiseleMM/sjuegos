import { Component } from '@angular/core';
import { Auth,User,createUserWithEmailAndPassword,sendEmailVerification } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CloudService } from '../../servicios/cloud.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  mail:string="";
  clave:string="";
  loginUser:string="";
  constructor(private auth:AuthService,private router:Router,private cloud:CloudService){}

  registrar()
  {
    if(this.mail!=null && this.clave!=null && this.mail.trim().length>0 && this.clave.trim().length>0)
      {
        try
        {
        
    
          // createUserWithEmailAndPassword(this.auth,this.mail,this.clave)
          this.auth.registrar(this.mail,this.clave)
          .then(res=>
            
            {
              this.loginUser=res.user.email??"";
              
              if(this.loginUser!="")
                {
                  this.cloud.addRegistro(this.mail);
                    this.router.navigateByUrl("/home");
                
                };
            })
          .catch(e=>this.loginUser=e.code);
    
        }catch(e)
        {
          console.log("error")
        }

      }else
      {
        this.loginUser="Debe completar campos";
      }
  
  

  }
  mostrarClave(evento: Event) {
    console.log("mostrar clave");
    let input = evento.target as HTMLButtonElement;
    const input_clave = document.getElementById("txtclave") as HTMLInputElement;
  

    if (input_clave.type=="text") {

      input_clave.type ="password";

    } else {
      input_clave.type = "text";
     

    }
  }
}
