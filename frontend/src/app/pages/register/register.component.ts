import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 animate-fade-in-up">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-12 h-12 bg-[#17211a] rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg class="w-6 h-6 text-[#c8f269]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-2">Join Star</p>
          <h1 class="text-2xl font-extrabold tracking-tight text-[#17211a]">Create account</h1>
          <p class="text-[#5f7656] mt-1">Join us and start shopping</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="surface-panel rounded-lg p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-[#3f4f3d] mb-1.5">Username</label>
            <input type="text" [(ngModel)]="data.username" name="username" required placeholder="johndoe"
              class="field-control w-full px-4 py-3 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#3f4f3d] mb-1.5">Email</label>
            <input type="email" [(ngModel)]="data.email" name="email" required placeholder="you&#64;example.com"
              class="field-control w-full px-4 py-3 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#3f4f3d] mb-1.5">Phone</label>
            <input type="tel" [(ngModel)]="data.phone" name="phone" required placeholder="+212 600 000 000"
              class="field-control w-full px-4 py-3 rounded-lg text-sm"/>
          </div>
          <div>
            <label class="block text-sm font-bold text-[#3f4f3d] mb-1.5">Password</label>
            <input type="password" [(ngModel)]="data.password" name="password" required placeholder="********"
              class="field-control w-full px-4 py-3 rounded-lg text-sm"/>
          </div>
          <button type="submit" [disabled]="auth.isLoading()"
            class="w-full py-3.5 btn-primary text-sm font-bold uppercase tracking-wider rounded-lg disabled:bg-[#c9d1c2] disabled:text-[#5f7656]">
            @if (auth.isLoading()) { Creating... } @else { Create Account }
          </button>
        </form>

        <p class="text-center text-sm text-[#5f7656] mt-6">
          Already have an account?
          <a routerLink="/login" class="font-bold text-[#17211a] hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  data: RegisterRequest = { username: '', email: '', password: '', phone: '' };

  onSubmit(): void {
    if (!this.data.email || !this.data.password || !this.data.username || !this.data.phone) return;
    this.auth.register(this.data).subscribe({
      next: () => this.router.navigate(['/login'])
    });
  }
}
