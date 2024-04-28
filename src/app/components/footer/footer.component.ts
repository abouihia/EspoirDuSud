import { Component } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import {ContactService} from '../../services/contact.service';
import { Email } from '../../models/email.model';
import { map } from 'rxjs/operators'
@Component({
  standalone:true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: '../../../assets/css/style.css',
  imports :[FormsModule]
})
export class FooterComponent {

;
    email: Email = new Email;
    emails?: Email[];
    existMail = false;
    constructor(private contactService: ContactService){
      this.retrieveTutorials();
    }

    saveEmail(){
        // check if email exist:
        const emailJson = JSON.stringify(this.email);
        const emailParsed = JSON.parse(emailJson);

        if(this.emails != null){
            for (const x of this.emails) {
                         if( x.mail === emailParsed.mail){this.existMail =true;  break;}
             }
          }
        if(! this.existMail){
         this.contactService.addNewEmail(this.email).then(() => {  this.email = new Email();   });
        }

    }

          retrieveTutorials(): void {
                          this.contactService.getAllEmails().snapshotChanges().pipe(
                            map(changes =>
                              changes.map(ref =>
                                ({ id: ref.payload.doc.id, ...ref.payload.doc.data() })
                            )
                        )
                   ).subscribe(data => {
                            this.emails =data;
                          });
           }

}
