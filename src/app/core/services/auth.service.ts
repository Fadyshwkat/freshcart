import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedInfo:any

  constructor(private _HttpClient:HttpClient) { }

  registerUser(userData:object):Observable<any>{
    
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/signup` , userData)
  }

  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${environments.baseUrl}/api/v1/auth/signin` , userData)
  }
  saveDecodedUser():void{
    if(sessionStorage.getItem('token')){
     this.decodedInfo= jwtDecode(sessionStorage.getItem('token')!)
    }
  }

  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , userEmail)
  }
  verifyResetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , resetCode)
  }
  resetPassword(userData:object):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , userData)
  }
}
