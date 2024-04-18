import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { HttpClient } from '@angular/common/http';
import {ContactService} from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: '../../../assets/css/style.css'
})
export class ContactComponent {

      contact: Contact = new Contact;
      submitted = false;

    constructor(private contactService: ContactService){
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
