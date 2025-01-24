import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.css'
})
export class MainNavComponent implements OnInit , OnDestroy {
constructor(private _Router:Router , private _CartService:CartService){}
signOut():void{
  sessionStorage.removeItem('token');
  this._Router.navigate(['/auth/login'])
}
cartCounter:number = 0
subId!:Subscription

ngOnInit(): void {

  this._CartService.getLoggedUserCart().subscribe({
    next : (res)=>{this.cartCounter = res.numOfCartItems}
  })




  this.subId = this._CartService.cartCount.subscribe({
    next: (value)=>{this.cartCounter = value}
  })
}
ngOnDestroy(): void {
  this.subId.unsubscribe()
}
}
