import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (auth.isAuthenticated()) {
    return true;
  }

  toast.error('Please log in to access this page');
  // Get current route URL state
  const state = router.routerState.snapshot;
  router.navigate(['/login'], { queryParams: { returnUrl: state?.url || '/' } });
  return false;
};
