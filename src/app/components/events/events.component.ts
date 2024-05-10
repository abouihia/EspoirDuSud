import { Component } from '@angular/core';
import { CountDownComponent } from '../count-down/count-down.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule} from '@angular/router';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CountDownComponent,CommonModule,RouterModule],
  templateUrl: './events.component.html',
  styleUrl: '../../../assets/css/style.css'
})
export class EventsComponent {

  constructor(public authService: AuthService  ) { }

}
