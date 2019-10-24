import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitcoinService } from '../services/bitcoin.service';
import { Order } from '../order';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {

  order :Order;
  genderDefined;
  constructor(private bitcoinSvc: BitcoinService, private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
    this.order = this.bitcoinSvc.getOrder();
  }

  orderType = this.activatedRoute.snapshot.params.orderType;
  back() {
    this.router.navigate(['/']);
  }
}
