import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink ,SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit , OnDestroy {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productsData!:IProduct[]
  productSub!:Subscription
  searchInputValue:string = ''


  


  ngOnInit(): void {
   this.productSub= this._ProductsService.getAllProducts().subscribe({
      next : (res) =>{ this.productsData=res.data
      },
    }) }



  ngOnDestroy():void{
    this.productSub?.unsubscribe()
    
  }
  addCartProduct(p_id:string){
    this._CartService.addProductToCart(p_id).subscribe({
      next : (res) =>{ console.log(res)
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message , 'FreshCart' , {closeButton:true})
       },
      
    })
  }
  
}
