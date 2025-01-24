import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit , OnDestroy{
  constructor(private _ProductsService:ProductsService , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService, private _CategoriesService:CategoriesService){}
  private readonly _ToastrService = inject(ToastrService)
  productId!:string | null
  productDetails:IProduct | null = null
  categoryDetails:ICategory | null = null
  productDetailsSub!:Subscription
  categoryDetailsSub!:Subscription
  activatedRouteSub!:Subscription

  productImages: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:1500,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  
}
 
  ngOnInit(): void {
    this.activatedRouteSub = this._ActivatedRoute.paramMap.subscribe({
      next:(pInfo)=>{
        this.productId = pInfo.get('p_id')
      }
    })

   
      this.productDetailsSub = this._ProductsService.getProductDetails(this.productId).subscribe({
        next:(res) =>{this.productDetails = res.data},
      })
    
    
      this.categoryDetailsSub = this._CategoriesService.getCategoryDetails(this.productId).subscribe({
        next:(res) =>{this.categoryDetails = res.data},
      })
    

  }

  ngOnDestroy(): void {
    this.activatedRouteSub.unsubscribe
    this.productDetailsSub.unsubscribe
  }

  addCartProduct(p_id:string){
    this._CartService.addProductToCart(p_id).subscribe({
      next : (res) =>{ console.log(res)
        this._ToastrService.success(res.message , 'FreshCart' , {closeButton:true})
       },
      error: (err)=>{console.log(err)
        this._ToastrService.error(err.message , 'FreshCart' , {closeButton:true})
      }
    })
  }


}
