import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitcoinService } from '../services/bitcoin.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {
  order: Order;
  orderType: string;
  orderId: string;
  genderDefined;
  constructor(private bitcoinSvc: BitcoinService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
    this.bitcoinSvc.getOrderDetails(this.orderId).then(result => {
      this.order = result;
      this.orderType = result.orderType;
    });
  }
}
