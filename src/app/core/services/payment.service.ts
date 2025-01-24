import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private _HttpClient:HttpClient) { }

  checkoutSession(cartId:string|null , shippingData:object):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environments.url}`
      ,{'shippingAddress':shippingData}
    )
  }
}
