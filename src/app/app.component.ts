import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: '../assets/css/style.css'
})
export class AppComponent {
  title = 'Espoir du sud';

  constructor(public authService: AuthService  ) { }
}
