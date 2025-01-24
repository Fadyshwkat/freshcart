import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
 private readonly _BrandsService = inject(BrandsService)
  brandsData!:any
  brandsSub!:Subscription


  


  ngOnInit(): void {
   this.brandsSub= this._BrandsService.getAllBrands().subscribe({
      next : (res) =>{ this.brandsData=res.data},
    }) }



  ngOnDestroy():void{
    this.brandsSub?.unsubscribe()
    
  }

  
}
