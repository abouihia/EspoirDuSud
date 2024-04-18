import { Injectable } from '@angular/core';


import { Contact } from '../models/contact.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
providedIn: 'root'
})
export class ContactService {


      private dbPath = '/contact';

      contactsRef: AngularFirestoreCollection<Contact>;

      constructor(private db: AngularFirestore) {
          this.contactsRef =  db.collection(this.dbPath);
        }

        getAll(): AngularFirestoreCollection<Contact> {
          return this.contactsRef;
        }

        create(contact: Contact): any {
          return this.contactsRef.add({ ...contact });
        }

        update(id: string, data: any): Promise<void> {
            return this.contactsRef.doc(id).update(data);
          }

          delete(id: string): Promise<void> {
            return this.contactsRef.doc(id).delete();
          }






}
