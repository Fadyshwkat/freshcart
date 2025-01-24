import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Correct import
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-code-verification',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './reset-code-verification.component.html',
  styleUrls: ['./reset-code-verification.component.css'], // Correct property name
})
export class ResetCodeVerificationComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  resetCodeForm: FormGroup = this._formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]], // Assuming a 6-digit numeric code
  });

  verifyResetCode(): void {
    if (this.resetCodeForm.invalid) {
      return; // Prevent submission if the form is invalid
    }

    this._authService.verifyResetCode(this.resetCodeForm.value).subscribe({
      next: (res) => {
        this._router.navigate(['/auth/reset-password'], {
          queryParams: { code: this.resetCodeForm.value.code },
        });
      },
      error: (err) => {
        console.error('Verification failed:', err);
        alert('Invalid code. Please try again.'); 
      },
    });
  }
}
