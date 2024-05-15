import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home', loadComponent: () => import("./componenetes/home/home.component").then(c => c.HomeComponent),
        children: [
            { path: "ahorcado", loadComponent: () => import("./componenetes/ahorcado/ahorcado.component").then(c => c.AhorcadoComponent) },
            { path: "mayormenor", loadComponent: () => import("./componenetes/mayormenor/mayormenor.component").then(c => c.MayormenorComponent) },
            { path: "quizz", loadComponent: () => import("./componenetes/trivia/trivia.component").then(c => c.TriviaComponent) },
            { path: "mijuego", loadComponent: () => import("./componenetes/mijuego/mijuego.component").then(c => c.MijuegoComponent) }


        ]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import("./componenetes/login/login.component").then(c => c.LoginComponent) },
    { path: 'register', loadComponent: () => import("./componenetes/register/register.component").then(c => c.RegisterComponent) },
    { path: 'aboutme', loadComponent: () => import("./componenetes/aboutme/aboutme.component").then(c => c.AboutmeComponent) },
    { path: "**", loadComponent: () => import("./componenetes/errorpage/errorpage.component").then(c => c.ErrorpageComponent) }

];
