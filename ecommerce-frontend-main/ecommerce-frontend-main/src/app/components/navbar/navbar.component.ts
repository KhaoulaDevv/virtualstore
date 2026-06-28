import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-[#fbfff7]/88 backdrop-blur-xl border-b border-[#70805c]/20">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <a [routerLink]="auth.isAdmin() ? '/admin' : '/'" class="flex items-center gap-2 group">
          <div class="w-8 h-8 bg-[#17211a] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <svg class="w-4 h-4 text-[#c8f269]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span class="text-lg font-extrabold tracking-tight text-[#17211a]">Star</span>
        </a>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center gap-8">
          @if (auth.isAdmin()) {
            <!-- Admin nav: only dashboard -->
            <a routerLink="/admin" routerLinkActive="text-black"
               class="text-sm font-semibold text-[#5f7656] hover:text-[#17211a] transition-colors duration-200 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Dashboard
            </a>
          } @else {
            <!-- Customer nav -->
            <a routerLink="/" routerLinkActive="text-black" [routerLinkActiveOptions]="{ exact: true }"
               class="text-sm font-semibold text-[#5f7656] hover:text-[#17211a] transition-colors duration-200">
              Products
            </a>
            @if (!auth.isAuthenticated()) {
              <a routerLink="/terms" routerLinkActive="text-black" class="text-sm font-semibold text-[#5f7656] hover:text-[#17211a] transition-colors duration-200">Terms</a>
              <a routerLink="/privacy" routerLinkActive="text-black" class="text-sm font-semibold text-[#5f7656] hover:text-[#17211a] transition-colors duration-200">Privacy</a>
              <a routerLink="/about" routerLinkActive="text-black" class="text-sm font-semibold text-[#5f7656] hover:text-[#17211a] transition-colors duration-200">About us</a>
              <a routerLink="/contact" routerLinkActive="text-black" class="text-sm font-semibold text-[#5f7656] hover:text-[#17211a] transition-colors duration-200">Contact us</a>
            }
            @if (auth.isAuthenticated()) {
              <a routerLink="/orders" routerLinkActive="text-black"
                 class="text-sm font-semibold text-[#5f7656] hover:text-[#17211a] transition-colors duration-200">
                Orders
              </a>
            }
          }
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-3">
          <!-- Cart (for customers and guests) -->
          @if (!auth.isAdmin()) {
            <a routerLink="/cart" class="relative p-2 rounded-lg hover:bg-[#edf7df] transition-colors duration-200 group">
              <svg class="w-5 h-5 text-[#5f7656] group-hover:text-[#17211a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (cartService.cartItemCount() > 0) {
                <span class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#c8f269] text-[#17211a] text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {{ cartService.cartItemCount() }}
                </span>
              }
            </a>
          }

          <!-- Auth Buttons -->
          @if (auth.isAuthenticated()) {
            <div class="flex items-center gap-3">
              <div class="hidden sm:flex items-center gap-2">
                <span class="text-sm text-[#5f7656]">{{ auth.currentUser()?.username }}</span>
                @if (auth.isAdmin()) {
                  <span class="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#17211a] text-[#c8f269] rounded">Admin</span>
                }
              </div>
              <button (click)="auth.logout()"
                class="text-sm font-semibold px-4 py-2 rounded-lg border border-[#70805c]/25 text-[#5f7656] hover:text-[#17211a] hover:border-[#70805c]/60 transition-all duration-200">
                Logout
              </button>
            </div>
          } @else {
            <a routerLink="/login"
               class="text-sm font-semibold px-4 py-2 rounded-lg border border-[#70805c]/25 text-[#5f7656] hover:text-[#17211a] hover:border-[#70805c]/60 transition-all duration-200">
              Sign in
            </a>
            <a routerLink="/register"
               class="text-sm font-semibold px-5 py-2 rounded-lg btn-primary">
              Register
            </a>
          }

          <!-- Mobile Menu Toggle -->
          <button (click)="toggleMobile()" class="md:hidden p-2 rounded-lg hover:bg-[#edf7df] transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileOpen) {
        <div class="md:hidden border-t border-[#70805c]/20 bg-[#fbfff7]/95 backdrop-blur-xl">
          <div class="px-6 py-4 flex flex-col gap-3">
            @if (auth.isAdmin()) {
              <a routerLink="/admin" (click)="mobileOpen = false"
                 class="text-sm font-medium text-neutral-600 hover:text-black py-2 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Dashboard
              </a>
            } @else {
              <a routerLink="/" (click)="mobileOpen = false"
                 class="text-sm font-medium text-neutral-600 hover:text-black py-2">Products</a>
              @if (!auth.isAuthenticated()) {
                <a routerLink="/terms" (click)="mobileOpen = false" class="text-sm font-medium text-neutral-600 hover:text-black py-2">Terms</a>
                <a routerLink="/privacy" (click)="mobileOpen = false" class="text-sm font-medium text-neutral-600 hover:text-black py-2">Privacy</a>
                <a routerLink="/about" (click)="mobileOpen = false" class="text-sm font-medium text-neutral-600 hover:text-black py-2">About us</a>
                <a routerLink="/contact" (click)="mobileOpen = false" class="text-sm font-medium text-neutral-600 hover:text-black py-2">Contact us</a>
              }
              @if (auth.isAuthenticated()) {
                <a routerLink="/orders" (click)="mobileOpen = false"
                   class="text-sm font-medium text-neutral-600 hover:text-black py-2">Orders</a>
              }
              <a routerLink="/cart" (click)="mobileOpen = false"
                 class="text-sm font-medium text-neutral-600 hover:text-black py-2">Cart</a>
            }
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
  readonly cartService = inject(CartService);
  mobileOpen = false;

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }
}
