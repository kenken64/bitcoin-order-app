import { Component, OnInit, Directive } from '@angular/core';
import { NgForm} from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  order :Order = new Order('','','','','','',0,0,'','',0);
  orderTypeDefault = "buy";
  validAge = true;
  genderField: string;
  genderList: string[] = ['Male', 'Female'];
  orderId: string;
  gender: string;
  myAmt:string = '0.00';
  buy = true;
  myPrice = 0;
  tomorrow= new Date();

  constructor(private bitcoinSvc: BitcoinService, private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
    this.bitcoinSvc.getPrice()
    .then(result => {
      this.myPrice = result.BTCSGD.ask; //initial load will get ask because default order type is buy
    })
    .catch(error=>{
      console.log(error);
    });

    this.bitcoinSvc.getOrderDetails(this.orderId).then(result=>{
      this.order = result;
      this.orderTypeDefault = result.orderType;
      this.gender = result.gender;
      console.log(result.orderType);
      console.log(result.orderUnit);
      this.recalcMyAmt(result.orderType, result.orderUnit);
    });
  }

  processForm(f:NgForm){
    console.log(this.orderId);
    f.value.amt = this.myAmt;
    f.value.price = this.myPrice;
    this.bitcoinSvc.updateOrderDetails(this.orderId, f.value).then(result=>{
      console.log(result);
      this.router.navigate(['/confirm', result.id]);
    });
    
  }

  checkAgeValid(dob){
    let myDob = new Date (dob);
    var ageDifMs = Date.now() - myDob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    let myAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    console.log("myAge=" , myAge);
    if (myAge<21){
      this.validAge = false;
    }
    else{
      this.validAge = true;
    }
    console.log(this.validAge);
  }
  
  checkBuyOrSell(f: string){
    console.log("f=", f);
    if (f == "Buy"){
      this.buy = true;
    }
    else if (f == "Sell"){
      this.buy = false;
    }
  }

  recalcMyAmt(buyOrSell, unit:number){
    console.log("buyOrSell =", buyOrSell);
    this.bitcoinSvc.getPrice()
    .then(result => {
      console.log(result);
      if (buyOrSell == "Buy"){
        this.myPrice = result.BTCSGD.ask;
      }
      else if (buyOrSell == "Sell"){
        this.myPrice = result.BTCSGD.bid;
      }
      else {
        this.myPrice = 0;
      }
      console.log("recalculating myAmt " + this.myPrice);
      if ( isNaN(unit) || isNaN(this.myPrice) ){
        this.myAmt = '0.00';     
      }
      else {
        let sum = unit*this.myPrice;
        this.myAmt = sum.toFixed(2);
      }
      console.log(this.myAmt);
    })
    .catch(error=>{
      console.log(error);
    });
  }


}
