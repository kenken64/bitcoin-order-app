import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bitcoin';

  constructor(private router: Router) { }

  buyBtc() {
    console.log("BUY !");
    setTimeout(() => {
      this.router.navigate(['buy-form/Buy']);
    }, 400);
  }

  sellBtc() {
    console.log("SELL !");
    setTimeout(() => {
      this.router.navigate(['sell-form/Sell']);
    }, 400);
  }
}
