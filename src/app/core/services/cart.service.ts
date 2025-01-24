import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartCount:BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private _HttpClient:HttpClient) { }
  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environments.baseUrl}/api/v1/cart` )
  }
  addProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/cart`,{'productId':p_id} )
  }
  removeItemFromCart(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environments.baseUrl}/api/v1/cart/${p_id}`)
  }
  updateProductQuantity(p_id:string , count:number):Observable<any>{
    return this._HttpClient.put(`${environments.baseUrl}/api/v1/cart/${p_id}`,{'count':count} )
  }
  clearUserCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
}
