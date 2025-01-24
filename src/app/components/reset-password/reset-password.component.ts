import { Component, inject } from '@angular/core';
import {  AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
 constructor(private _AuthService:AuthService , private _Router:Router , private _ToastrService:ToastrService){}

  resetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    newPassword: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  })


 
  resetSubmit():void{
    if(this.resetPasswordForm.valid){
      this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) =>{
         this._ToastrService.success('Password Has Successfully Changed' , 'FreshCart' , {closeButton:true})
          setInterval(()=>{this._Router.navigate(['/auth/login'])}, 1000)
        },
        
      })
    }
    else{
      this.resetPasswordForm.markAllAsTouched()
    }
  }


}
