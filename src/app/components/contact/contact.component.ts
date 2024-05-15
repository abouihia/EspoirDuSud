import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import {ContactService} from '../../services/contact.service';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,GoogleMapsModule, CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: '../../../assets/css/style.css'
  
})
export class ContactComponent {
  

        contact: Contact = new Contact;
        submitted = false;
        sendedOk = false;
        remainingText : number;
        registerForm!: FormGroup;

        constructor(private contactService: ContactService,  
          private formBuilder: FormBuilder ){
          this.remainingText=0;
        }

        ngOnInit() {
          this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            message: ['', Validators.required],
         
          });
        }


       // convenience getter for easy access to form fields
       get f() { return this.registerForm.controls; }

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

      

      valueChange() {
  
      let val =this.registerForm.controls['message'].value;
 
          this.remainingText =  val.length;
      }

        saveContact(): void {
            this.submitted = true;
         
          // stop here if form is invalid
          if (this.registerForm.invalid) {  
            return; 
          }
            this.contactService.create(this.contact).then(() => {

              console.log('Created new item successfully!');
              this.sendedOk = true;
            });
          }


          newContact(): void {
              this.submitted = false;
              this.contact = new Contact();
            }

          



}
