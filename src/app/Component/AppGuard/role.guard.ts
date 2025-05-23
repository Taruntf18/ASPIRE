import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'; // adjust the path as needed

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as string[];
  const userRoles = authService.getRoles();

  const hasRole = expectedRoles.some(role => userRoles.includes(role));

  if (!hasRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
