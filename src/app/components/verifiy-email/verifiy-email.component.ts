import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verifiy-email',
  templateUrl: './verifiy-email.component.html',
  styleUrl: '../../../assets/css/style.css',
  standalone:true,
  imports: [RouterModule, CommonModule]
})
export class VerifiyEmailComponent implements OnInit {

  
  
  constructor(public authService: AuthService  ) { }
 
 
  ngOnInit() { }

}
