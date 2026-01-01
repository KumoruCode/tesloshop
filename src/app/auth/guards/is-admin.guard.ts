import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = await firstValueFrom(authService.checkStatus());

  if (!isAuthenticated) return false;
  const user = authService.user();
  const isAutorithed = user?.roles.includes('admin') ? true : false;
  if (!isAutorithed) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
