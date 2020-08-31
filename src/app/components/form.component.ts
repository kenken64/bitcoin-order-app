import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit, AfterViewInit, OnChanges {
  orderTypeDefault = 'Buy';
  validAge = true;
  genderField: string;
  genderList: string[] = ['Male', 'Female'];
  tomorrow = new Date();
  myAmt = '0.00';
  buy = true;
  myPrice = 0;

  constructor(private bitcoinSvc: BitcoinService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngAfterViewInit() {

  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.orderTypeDefault = this.activatedRoute.snapshot.params.orderType;
    console.log(this.orderTypeDefault);
    if ( this.orderTypeDefault === 'Sell' ) {
      this.buy = false;
    }

    this.bitcoinSvc.getPrice()
      .then(result => {
        console.log(result);
        this.myPrice = result.ask;
      })
      .catch(error => {
        console.log(error);
      });
  }

  processForm(f: NgForm, myPrice, myAmt) {
    const orderType = this.buy ? 'Buy' : 'Sell';
    console.log(orderType);
    const x = this.bitcoinSvc.saveOrderDetails(f.value, myPrice, myAmt, orderType).then(result => {
      console.log(result);
      this.router.navigate(['/confirm', result.id]);
    });

  }

  checkAgeValid(dob) {
    const myDob = new Date(dob);
    const ageDifMs = Date.now() - myDob.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const myAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (myAge < 21) {
      this.validAge = false;
    } else {
      this.validAge = true;
    }
  }

  checkBuyOrSell(f: string) {
    if (f === 'Buy') {
      this.buy = true;
    } else if (f === 'Sell') {
      this.buy = false;
    }
  }

  recalcMyAmt(buyOrSell, unit: number) {
    this.bitcoinSvc.getPrice()
      .then(result => {
        if (buyOrSell === 'Buy') {
          this.myPrice = result.ask;
        } else if (buyOrSell === 'Sell') {
          this.myPrice = result.bid;
        } else {
          this.myPrice = 0;
        }
      })
      .catch(error => {
        console.log(error);
      });

    if (isNaN(unit) || isNaN(this.myPrice)) {
      this.myAmt = '0.00';
    } else {
      const sum = unit * this.myPrice;
      this.myAmt = sum.toFixed(2);
    }
  }

  resetForm(f: NgForm){
    console.log(f.value);
    f.controls['contactno'].reset();
    f.controls['bitAddress'].reset();
    f.controls['myQr'].reset();
    f.controls['dob'].reset();
    f.controls['gender'].reset();
    f.controls['name'].reset();
    f.controls['orderDate'].reset();
    f.controls['unit'].reset();
  }

}
