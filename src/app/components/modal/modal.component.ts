import { Component,TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{


        user!: any;
        modalRef?: BsModalRef;
        public userData = [
        {
        id: 1,
        firstName: "Emmanuel",
        lastName: "Luke",
        bodySize: 11,
        description: "I love art",
        },
        {
        id: 2,
        firstName: "Ugo",
        lastName: "Ebuka",
        bodySize: 19,
        description: "skating gives me so much joy.",
        },
        {
        id: 3,
        firstName: "hilda",
        lastName: "tules",
        bodySize: 10,
        description: "photography is my happy place",
        },
        {
        id: 4,
        firstName: "Gerald",
        lastName: "Emelda",
        bodySize: 12,
        description: "italian pasta is the best",
        },
        ];

        constructor(private modalService: BsModalService) {}

          ngOnInit() {}

          openModal(viewUserTemplate: TemplateRef<any>, userId: number) {
            if (userId) {
              this.user = this.userData.find((x) => x.id === userId);
              console.log(this.user);
              this.modalRef = this.modalService.show(viewUserTemplate);
            }
          }
          exitModal = (): void => {
            this.modalRef?.hide();
          };

}
