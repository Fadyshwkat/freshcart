import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit , OnDestroy {
  constructor(private _CartService:CartService){}
  private readonly _ToastrService = inject(ToastrService)
  getCartSub!:Subscription
  cartData:ICart|null = null
  quantityMsg:string ='Quantity is Successfully Updated'
  deleteMsg:string ='Product is Successfully Removed'



  ngOnInit(): void {
   this.getCartSub= this._CartService.getLoggedUserCart().subscribe({
      next: (res)=>{
        this.cartData=res.data
      },
    })
  }
  ngOnDestroy(): void {
    this.getCartSub?.unsubscribe()
  }

  removeItem(p_id:string):void{
    this._CartService.removeItemFromCart(p_id).subscribe({
      next: (res)=>{
        this.cartData=res.data
        this._ToastrService.info(this.deleteMsg, 'FreshCart' , {closeButton:true})
        this._CartService.cartCount.next(res.numOfCartItems)
      },
      
    })
  }
  updateQuantity(p_id:string , count:number):void{
    if(count > 0){
      this._CartService.updateProductQuantity(p_id , count).subscribe({
        next: (res)=>{console.log(res)
          this.cartData=res.data
          this._ToastrService.success(this.quantityMsg , 'FreshCart' , {closeButton:true})
        },
        error: (err)=>{
          this._ToastrService.error(err.message , 'FreshCart' , {closeButton:true})
        }
      })
    }
  }
  clearCart():void{
    this._CartService.clearUserCart().subscribe({
      next : (res)=>{if(res.message == 'success'){   this.cartData=res.data,
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.info('Your Cart was cleared successfully', 'FreshCart' , {closeButton:true})
      }}
    })
  }
}
