import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  loading:boolean = false
  resText!:string
  registerSub!:Subscription
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null , [Validators.required]),
    phone: new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, this.comparePassword)


  comparePassword(fGroup:AbstractControl){
    if(fGroup.get('password')?.value === fGroup.get('rePassword')?.value){
      return null;
    }else{
      return{'misMatch':true}
    }
  }

  registerSubmit():void{
    if(this.registerForm.valid){
      this.loading=true
     this.registerSub = this._AuthService.registerUser(this.registerForm.value).subscribe({
        next: (res) =>{
          this.resText = res.message
          this.loading = false
          setInterval(()=>{this._Router.navigate(['/auth/login'])}, 1000)
        },
        error: (err) =>{
          this.resText = err.error.message
          this.loading = false
        },
        complete: () =>{},
      })
    }
    else{
      this.registerForm.markAllAsTouched()
      this.registerForm.setErrors({'misMatch':true})
    }
  }

ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
}

}
