import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'home',loadComponent:()=>import("./componenetes/home/home.component").then(c=>c.HomeComponent)},
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'login',loadComponent:()=>import("./componenetes/login/login.component").then(c=>c.LoginComponent)},
    {path:'register',loadComponent:()=>import("./componenetes/register/register.component").then(c=>c.RegisterComponent)},
    {path:'aboutme',loadComponent:()=>import("./componenetes/aboutme/aboutme.component").then(c=>c.AboutmeComponent)}


];
