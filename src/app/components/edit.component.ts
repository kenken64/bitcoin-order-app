import { Component, OnInit, Directive } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BitcoinService } from '../services/bitcoin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../models/order';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  order: Order = new Order('', '', '', '', '', '', 0, 0, '', '', 0);
  orderTypeDefault = 'Buy';
  validAge = true;
  genderField: string;
  genderList: string[] = ['Male', 'Female'];
  orderId: string;
  gender: string;
  myAmt = '0.00';
  buy = true;
  myPrice = 0;
  tomorrow = new Date();

  constructor(private bitcoinSvc: BitcoinService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
    this.bitcoinSvc.getPrice()
      .then(result => {
        this.myPrice = result.BTCSGD.ask;
      })
      .catch(error => {
        console.log(error);
      });

    this.bitcoinSvc.getOrderDetails(this.orderId).then(result => {
      this.order = result;
      this.orderTypeDefault = result.orderType;
      this.gender = result.gender;
      console.log(result.orderType);
      console.log(result.orderUnit);
      this.recalcMyAmt(result.orderType, result.orderUnit);
    });
  }

  processForm(f: NgForm) {
    f.value.amt = this.myAmt;
    f.value.price = this.myPrice;
    this.bitcoinSvc.updateOrderDetails(this.orderId, f.value).then(result => {
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
    console.log(this.validAge);
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
          this.myPrice = result.BTCSGD.ask;
        } else if (buyOrSell === 'Sell') {
          this.myPrice = result.BTCSGD.bid;
        } else {
          this.myPrice = 0;
        }
        if (isNaN(unit) || isNaN(this.myPrice)) {
          this.myAmt = '0.00';
        } else {
          const sum = unit * this.myPrice;
          this.myAmt = sum.toFixed(2);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


}
