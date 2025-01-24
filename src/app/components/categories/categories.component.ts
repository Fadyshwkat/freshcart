import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink , SearchPipe , FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit , OnDestroy {
    private readonly _CategoriesService = inject(CategoriesService)
    categoriesData!:ICategory[]
    categoriesSub!:Subscription
    searchInputValue:string = ''

    ngOnInit(): void {
       this.categoriesSub = this._CategoriesService.getAllCategories().subscribe({
         next : (res) =>{this.categoriesData=res.data
         },
           }) 
         }
   
     ngOnDestroy():void{
       this.categoriesSub?.unsubscribe()      
     }
    
  

}
