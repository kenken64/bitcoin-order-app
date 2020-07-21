import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../services/bitcoin.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  btcOrders = [];
  constructor(private bitcoinSvc: BitcoinService,
              private router: Router,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer ) {
    iconRegistry.addSvgIcon(
      'btc',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/BCH.svg'));
  }

  ngOnInit() {
    this.bitcoinSvc.getOrderList().then(result => {
      console.log(result);
      this.btcOrders = result;
    });
  }

  navigateToEditOrder(orderId) {
    this.router.navigate(['/edit/' + orderId]);
  }
}
