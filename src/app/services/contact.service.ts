import { Injectable } from '@angular/core';


import { Contact } from '../models/contact.model';
import { Email } from '../models/email.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class ContactService {


      private dbPath = '/contact';
      private  dbEmailAdresse = '/emails';

      emailRef: AngularFirestoreCollection<Email>;
      contactsRef: AngularFirestoreCollection<Contact>;


      constructor(private db: AngularFirestore, private db2: AngularFirestore) {
          this.contactsRef =  db.collection(this.dbPath);
          this.emailRef = db2.collection(this.dbEmailAdresse);
        }

        getAllContact(): AngularFirestoreCollection<Contact> {
          return this.contactsRef;
        }
        getAllEmails(): AngularFirestoreCollection<Email> {
              return this.emailRef;
            }

        create(contact: Contact): any {
          return this.contactsRef.add({ ...contact });
        }

        addNewEmail(email: Email): any {

        return this.emailRef.add({ ...email });
        }

        update(id: string, data: any): Promise<void> {
            return this.contactsRef.doc(id).update(data);
          }

          delete(id: string): Promise<void> {
            return this.contactsRef.doc(id).delete();
          }








}
