import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bitcoin';

  constructor(private router: Router){}
  
  buyBtc(){
    console.log("Buy BTC ");
    setTimeout(()=>{
      this.router.navigate(['form/Buy']);
    },400);  
  }

  sellBtc(){
    console.log("Sell BTC ");
    setTimeout(()=>{
      this.router.navigate(['form/Sell']);
    },400);
  }
}
