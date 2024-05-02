import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"sjuegos-dd88f","appId":"1:834618985942:web:f3bec234b35414f51c6877","storageBucket":"sjuegos-dd88f.appspot.com","apiKey":"AIzaSyCUjGQoPdQTRNdFnfQnEzJuNE8Aqx6l244","authDomain":"sjuegos-dd88f.firebaseapp.com","messagingSenderId":"834618985942"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
