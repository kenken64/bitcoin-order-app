import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bitcoin';

  constructor(private router: Router,private ngZone: NgZone){

  }
  buyBtc(){
    console.log("Buy BTC ");
    this.ngZone.run(() =>
      this.router.navigate(['form/Buy']));
  }

  sellBtc(){
    console.log("Sell BTC ");
    this.ngZone.run(() =>
      this.router.navigate(['form/Sell']));
  }
}
