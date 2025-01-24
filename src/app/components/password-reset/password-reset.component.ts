import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
    private readonly _FormBuilder = inject(FormBuilder)
    private readonly _Router = inject(Router)
    private readonly _AuthService = inject(AuthService)
    private readonly _ToastrService = inject(ToastrService)
  
    userEmail:FormGroup = this._FormBuilder.group({
      email:[null , Validators.required],
      })

    sendPasswordResetEmail():void{
      this._AuthService.forgotPassword(this.userEmail.value).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message , 'FreshCart' , {closeButton:true})
          this._Router.navigate(['/auth/reset-code-verification'])
        }
      })
    }
}
