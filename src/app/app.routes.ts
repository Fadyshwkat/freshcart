import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ResetCodeVerificationComponent } from './components/reset-code-verification/reset-code-verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
    {path:'', redirectTo:'auth',pathMatch:'full'},

    {
        path: 'auth',component: AuthComponent,children: [
            {path:'', redirectTo:'login',pathMatch:'full'},
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
            { path: 'forgot-password', component: PasswordResetComponent, title: 'Forgot Password' },
            { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset Password' },
            { path: 'reset-code-verification', component: ResetCodeVerificationComponent, title: 'Reset Code Verification' }
        ],
    },

    {
        path: 'main',component: MainComponent,canActivate: [authGuard],
        children: [
             {path:'', redirectTo:'home',pathMatch:'full'},
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'cart', component: CartComponent, title: 'Cart' },
            { path: 'brands', component: BrandsComponent, title: 'Brands' },
            { path: 'products', component: ProductsComponent, title: 'Products' },
            { path: 'categories', component: CategoriesComponent, title: 'Categories' },
            { path: 'productDetails/:p_id', component: ProductDetailsComponent, title: 'Details' },
            { path: 'checkout/:cart_id', component: CheckoutComponent, title: 'Checkout' },
        ],
    },
    { path: 'allorders', component: AllordersComponent, title: 'All Orders' },

    { path: '**', component: NotFoundComponent, title: 'Page Not Found' },
];
