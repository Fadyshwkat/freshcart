import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

    constructor(private _HttpClient:HttpClient) { }
  
    getAllBrands():Observable<any>{
      return this._HttpClient.get(`${environments.baseUrl}/api/v1/brands`)
    }
    getbrandDetails(id:string | null):Observable<any>{
      return this._HttpClient.get(`${environments.baseUrl}/api/v1/brands/${id}`)
    }
}
