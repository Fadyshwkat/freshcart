import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true; // Allow navigation
    } else {
      router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login
      return false;
    }
  }

  return true; // Allow navigation for non-browser environments
};
