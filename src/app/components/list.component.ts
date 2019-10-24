import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../services/bitcoin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  btcOrders = [];
  constructor(private bitcoinSvc: BitcoinService, private activatedRoute: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['/']);
  }
}
