import { Component, OnInit } from '@angular/core';
import { Observable, filter, interval, map, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  interval$!: Observable<string>;
  ngOnInit() {
    this.interval$ = interval(1000).pipe(
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ? `Je suis ${value} pair`: `Je suis ${value} impair`),
      tap(text => this.logger(text))
    );
  }

  logger (text: string){
    console.log(`Log: ${text}`);
    
  }
}



