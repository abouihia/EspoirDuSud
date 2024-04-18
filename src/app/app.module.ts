import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { CountDownComponent } from './components/count-down/count-down.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
