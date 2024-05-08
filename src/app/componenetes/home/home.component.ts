import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
  
 
  desactivada=true;
  private sub!:Subscription;
  private auth=inject(AuthService);

  ngOnInit(): void {
    this.sub=this.auth.getUser().subscribe(u=>{
      let mail=u?.email;
      if(mail!=null)
        {
          this.desactivada=false;
        }else{
          this.desactivada=true;
        }
    });


  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
