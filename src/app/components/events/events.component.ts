import { Component } from '@angular/core';
import { CountDownComponent } from '../count-down/count-down.component';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CountDownComponent],
  templateUrl: './events.component.html',
  styleUrl: '../../../assets/css/style.css'
})
export class EventsComponent {

}
