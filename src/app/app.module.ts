import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { ConnexionComponent } from './components/connexion/connexion.component';




@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FooterComponent,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
