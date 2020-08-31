import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  constructor(private http: HttpClient) { }
  backendApiUrl = environment.api_url;
  bitcoinApiUrl = `${this.backendApiUrl}/bitcoin`;
  bitcoinPriceApiUrl = `${this.backendApiUrl}/price`;

  myServicePrice: number;

  public getPrice(): Promise<any> {
    return (
      this.http.get<any>(`${this.bitcoinPriceApiUrl}?primaryCurry=BTC&secondaryCurry=SGD`).toPromise()
    );
  }

  public getOrderDetails(orderId): Promise<Order> {
    return this.http.get<Order>(this.bitcoinApiUrl + '/' + orderId).toPromise();
  }

  public updateOrderDetails(orderId, order) {
    return this.http.put<any>(this.bitcoinApiUrl + '?orderId='
      + orderId, order).toPromise();
  }

  public saveOrderDetails(orderDet, myPrice, myAmt, orderType) {
    const svcOrder = new Order(
      '',
      '',
      '',
      '',
      'not selected',
      '',
      0,
      0,
      `https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/
        attachments/production/22041032646/original/RgItugeuFVq91GFRfS
        4iNcUFzoOKjRuKjA.png`,
      'not selected',
      0
    );
    svcOrder.address = orderDet.bitAddress;
    svcOrder.contactNo = orderDet.contactno;
    svcOrder.dob = orderDet.dob;
    svcOrder.gender = orderDet.gender;
    svcOrder.name = orderDet.name;
    svcOrder.orderType = orderType;
    svcOrder.orderUnit = orderDet.unit;
    svcOrder.qrUrl = orderDet.myQr;
    svcOrder.orderDate = orderDet.orderDate;
    svcOrder.price = myPrice;
    svcOrder.amt = myAmt;
    return this.http.post<any>(this.bitcoinApiUrl, svcOrder).toPromise();
  }
}
