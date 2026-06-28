import { Component, inject } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 animate-fade-in-up">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-12 h-12 bg-[#17211a] rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg class="w-6 h-6 text-[#c8f269]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-2">Star account</p>
          <h1 class="text-2xl font-extrabold tracking-tight text-[#17211a]">Welcome back</h1>
          <p class="text-[#5f7656] mt-1">Sign in to your account</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="surface-panel rounded-lg p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-[#3f4f3d] mb-1.5">Email</label>
            <input type="email" [(ngModel)]="credentials.email" name="email" required
              placeholder="you&#64;example.com"
              class="field-control w-full px-4 py-3 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#3f4f3d] mb-1.5">Password</label>
            <input type="password" [(ngModel)]="credentials.password" name="password" required
              placeholder="********"
              class="field-control w-full px-4 py-3 rounded-lg text-sm"/>
          </div>
          <button type="submit" [disabled]="auth.isLoading()"
            class="w-full py-3.5 btn-primary text-sm font-bold uppercase tracking-wider rounded-lg disabled:bg-[#c9d1c2] disabled:text-[#5f7656]">
            @if (auth.isLoading()) { Signing in... } @else { Sign In }
          </button>
        </form>

        <p class="text-center text-sm text-[#5f7656] mt-6">
          Don't have an account?
          <a routerLink="/register" class="font-bold text-[#17211a] hover:underline">Create one</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  credentials: LoginRequest = { email: '', password: '' };

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) return;
    this.auth.login(this.credentials).subscribe({
      next: (user) => {
        this.cartService.syncGuestCart();

        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        let target = user.role === 'ADMIN' ? '/admin' : '/';

        if (returnUrl && returnUrl !== '/') {
          target = returnUrl;
        }

        this.router.navigateByUrl(target);
      }
    });
  }
}
