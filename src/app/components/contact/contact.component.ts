import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import {ContactService} from '../../services/contact.service';
import { FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,GoogleMapsModule],
  templateUrl: './contact.component.html',
  styleUrl: '../../../assets/css/style.css'
})
export class ContactComponent {
  

      contact: Contact = new Contact;
      submitted = false;
     remainingText : number;

     /*   **/
     display: any;
     center: google.maps.LatLngLiteral = {
         lat: 29.801567,
         lng: -9.549286
     };
     zoom = 6;

         /*------------------------------------------
    --------------------------------------------
           moveMap()
    --------------------------------------------
    --------------------------------------------*/
     moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
      }

      /*------------------------------------------
    --------------------------------------------
    move()
    --------------------------------------------
    --------------------------------------------*/
    move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

    constructor(private contactService: ContactService){
    this.remainingText=0;
    }

   valueChange(value) {
      this.remainingText =  value.length;
   }

    saveContact(): void {
        console.log(this.contact);
        this.contactService.create(this.contact).then(() => {

          console.log('Created new item successfully!');
          this.submitted = true;
        });
      }


      newContact(): void {
          this.submitted = false;
          this.contact = new Contact();
        }

       



}
