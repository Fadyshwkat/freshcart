import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
    resText!:string
    errorm!:string
   loading:boolean = false
   loginSub!:Subscription
   intervalId!:any

  loginForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]}
  )

  loginSubmit():void{
    if(this.loginForm.valid){
      this.loading=true
    this.loginSub=  this._AuthService.loginUser(this.loginForm.value).subscribe({
        next: (res)=>{
          this.resText = res.message
          this.loading = false
          sessionStorage.setItem('token', res.token)
          this._AuthService.saveDecodedUser()
        this.intervalId =  setInterval(()=>{this._Router.navigate(['/main/home'])}, 1000)
        },
        error: (err)=>{
          this.resText = err.error.message
          this.errorm = err.error.message
          this.loading = false
        },
        complete: ()=>{}
      })
    }
  }

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe()
    clearInterval(this.intervalId)
  }

  // forgotPassword(userEmail):void{
  //   this._AuthService.forgotPassword()
  // }
}
