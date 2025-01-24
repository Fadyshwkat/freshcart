import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _PaymentService = inject(PaymentService)
  cartId!:string|null

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next : (param)=>{ this.cartId = param.get('cart_id')}
    })
  }

  shippingAddress:FormGroup = this._FormBuilder.group({
    details:[null , Validators.required],
    phone:[null , Validators.required],
    city:[null , Validators.required],
  })


  payOrder():void{
    console.log(this.shippingAddress.value)
    this._PaymentService.checkoutSession(this.cartId , this.shippingAddress.value).subscribe({
      next: (res)=>{window.open(res.session.url , '_self')}
    })
  }
}
