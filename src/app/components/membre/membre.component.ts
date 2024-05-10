import { Component } from '@angular/core';
import { Membre } from '../../models/membre.model';
import {ContactService} from '../../services/contact.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrl: '../../../assets/css/style.css',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
})
export class MembreComponent {

      membre: Membre = new Membre;
      registerForm!: FormGroup;
      submitted = false;
      hide = true;


      constructor(private contactService: ContactService,  
         private formBuilder: FormBuilder,   public authService: AuthService){  }

      ngOnInit() {
        this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          address: ['', Validators.required],
          phone: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', Validators.required],
          villageOrigine: ['', Validators.required],      
        }, {
          validators: MustMatch('password', 'confirmPassword')
      });
    }
     
   

  village : any = [
        'Ait Brahim ou Youssef' ,
         'Afergoula' ,
         'Aouja' ,
         'Bourjaylat' ,
         'Sbouy' ,
         'ElFeid' ,
         'Boungaref' ,
       'Lmarhjoub' ,
         'Taglmoust' ,
         'AAmor' 
    ];
  

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    

    /*    ces deux methode pour la visibilité du mots de passe */
    toggleVisibility(): void {
      this.hide = !this.hide;
    }

    getIputType() {
        return this.hide ?  'text':'password';
    }
  
    onSubmit() {
       this.submitted = true;
       // stop here if form is invalid
       console.log(this.registerForm.controls['villageOrigine'].value)
      
       if (this.registerForm.invalid) {  return; }
       // voir comment améliorer ça.
       this.membre.villageOrigine=this.registerForm.controls['villageOrigine'].value
       this.authService.SignUp(this.membre);
  }

    onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
      

}
