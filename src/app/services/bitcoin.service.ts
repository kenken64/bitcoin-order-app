import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
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
  
  myServicePrice :number;

  getPrice(): Promise<any> {
    return (
      this.http.get<any>(`${this.bitcoinPriceApiUrl}?primaryCurry=SGD&secondary=BTC`).toPromise()
    );
  }

  public getOrderDetails(orderId): Promise<Order>{
    console.log("getOrderDetails");
    return this.http.get<Order>(this.bitcoinApiUrl+'/' + orderId).toPromise();
  }

  getOrderList(): Promise<any>{
    console.log("getOrderList");
    return this.http.get<any>(this.bitcoinApiUrl).toPromise();
  }

  updateOrderDetails(orderId, order){
    console.log("updateOrderDetails" + order);
    return this.http.put<any>(this.bitcoinApiUrl+'?orderId=' + orderId, order).toPromise();
  }
  
  saveOrderDetails(orderDet, myPrice, myAmt){
    console.log("saveOrderDetails");
    let svcOrder = new Order(
      '',
      '',
      '',
      '',
      'not selected',
      '',
      0,
      0, 
      'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/22041032646/original/RgItugeuFVq91GFRfS4iNcUFzoOKjRuKjA.png',
      'not selected',
      0
    );
    svcOrder.address = orderDet.bitAddress;
    svcOrder.contactNo = orderDet.contactno;
    svcOrder.dob = orderDet.dob;
    svcOrder.gender = orderDet.gender;
    svcOrder.name = orderDet.name;
    svcOrder.orderType = orderDet.orderType;
    svcOrder.orderUnit = orderDet.unit;
    svcOrder.qrUrl = orderDet.myQr;
    svcOrder.orderDate = orderDet.orderDate;
    svcOrder.price = myPrice;
    svcOrder.amt = myAmt;
    return this.http.post<any>(this.bitcoinApiUrl, svcOrder)
        .toPromise();  
  }
  
}
