import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';  
import { Order } from '../order';
@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  cors = 'https://cors-anywhere.herokuapp.com/';
  btcApiUrl = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=SGD,BTC';
  backendApiUrl = "http://localhost:3000/api/bitcoin";

  myHeaders = new HttpHeaders({
    'X-testing': 'testing'
  });

  myServicePrice :number;
  getPrice(): Promise<any> {
    return (
      this.http.get<any>(this.cors + this.btcApiUrl, {headers: this.myHeaders}).toPromise()
    );
  }

  getOrderDetails(orderId): Promise<any>{
    const httpParams = new HttpParams()
      .set('orderId', orderId);
    return this.http.get<any>(this.backendApiUrl,{params: httpParams} ).toPromise();
  }

  getOrderList(): Promise<any>{
    return this.http.get<any>(this.backendApiUrl).toPromise();
  }

  updateOrderDetails(orderId, order){
    const httpParams = new HttpParams()
      .set('orderId', orderId);
    return this.http.put<any>(this.backendApiUrl, order, {params: httpParams}).toPromise();
  }
  
  saveOrderDetails(orderDet, myPrice, myAmt){
    let svcOrder = new Order(
      '',
      '',
      '',
      '',
      'not selected',
      '',
      0,
      0, 
      'https://static.thenounproject.com/png/340719-200.png',
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
    svcOrder.price = myPrice;
    svcOrder.amt = myAmt;
    return this.http.post<any>(this.backendApiUrl, svcOrder)
        .toPromise();  
  }
  constructor(private http: HttpClient) { }
}
