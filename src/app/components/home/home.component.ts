import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  productsData!:IProduct[]
  productSub!:Subscription
  categoriesData!:ICategory[]
  categoriesSub!:Subscription
  searchInputValue:string = ''


  

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout:2000,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 6
      }
    },
    nav: true
  }
  


  ngOnInit(): void {
   this.productSub= this._ProductsService.getAllProducts().subscribe({
      next : (res) =>{ this.productsData=res.data.slice(0,30)
      },
    })

    this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next : (res) =>{this.categoriesData=res.data
                  },
        }) 
      }


  ngOnDestroy():void{
    this.productSub?.unsubscribe()
    this.categoriesSub?.unsubscribe()
    
  }
  addCartProduct(p_id:string){
    this._CartService.addProductToCart(p_id).subscribe({
      next : (res) =>{ 
        this._ToastrService.success(res.message , 'FreshCart' , {closeButton:true})
        this._CartService.cartCount.next(res.numOfCartItems)
       },
    })
  }

}
