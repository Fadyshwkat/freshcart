import { Component } from '@angular/core';
import { MainNavComponent } from "../../components/main-nav/main-nav.component";
import { HomeComponent } from "../../components/home/home.component";
import { ProductsComponent } from "../../components/products/products.component";
import { BrandsComponent } from "../../components/brands/brands.component";
import { CategoriesComponent } from "../../components/categories/categories.component";
import { CartComponent } from "../../components/cart/cart.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainNavComponent, RouterOutlet  , FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
