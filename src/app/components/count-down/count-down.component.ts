import { Component } from '@angular/core';

import { interval, Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { CommonModule } from '@angular/common';
import { Time } from '../../models/time.model';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.css'
})
export class CountDownComponent  {



    public timeLeft: Observable<Time>;
      time: Time = new Time;

    constructor() {
        this.timeLeft = interval(1000).pipe(
          map(x => this.calcDateDiff()),
          shareReplay(1)
        );
      }

   calcDateDiff(endDay: Date = new Date(2024, 4, 22)): Time {
          const dDay = endDay.valueOf();

           console.log ("dDay:"+ dDay)

          const milliSecondsInASecond = 1000;
          const hoursInADay = 24;
          const minutesInAnHour = 60;
          const secondsInAMinute = 60;

          const timeDifference = dDay - Date.now();
         console.log ("timeDifference:"+ timeDifference)
          const daysToDday = Math.floor(  timeDifference /(milliSecondsInASecond * minutesInAnHour * secondsInAMinute * hoursInADay)  );
          console.log ("daysToDday:"+ daysToDday)
          const hoursToDday = Math.floor(
            (timeDifference /(milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %  hoursInADay
          );
          console.log ("hoursToDday:"+ hoursToDday)
          const minutesToDday = Math.floor(  secondsInAMinute );
 console.log ("minutesToDday:"+ minutesToDday)
          const secondsToDday = Math.floor(timeDifference / milliSecondsInASecond) % secondsInAMinute;

          return { secondsToDday, minutesToDday, hoursToDday, daysToDday };
        }
}
