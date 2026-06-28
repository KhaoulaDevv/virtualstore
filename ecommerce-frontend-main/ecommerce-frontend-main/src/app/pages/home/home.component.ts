import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  template: `
    <div class="animate-fade-in-up">
      <!-- Hero Section -->
      <section class="relative overflow-hidden bg-[#17211a] text-[#fbfff7]">
        <div class="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div class="max-w-2xl">
              <p class="text-xs font-bold tracking-[0.22em] text-[#c8f269] uppercase mb-4">New everyday edit</p>
              <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                Curated goods for calm, useful living.
            </h1>
              <p class="text-lg text-[#d8e5cd] mb-8 max-w-xl">
                Browse a compact catalog with sharp essentials, clean product pages, and a checkout flow built to stay out of the way.
              </p>
              <div class="flex flex-wrap gap-3">
                <a href="#products" class="inline-flex items-center gap-2 px-7 py-3.5 btn-accent rounded-lg font-bold group">
                  Shop products
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a routerLink="/about" class="inline-flex items-center px-7 py-3.5 rounded-lg border border-white/20 text-sm font-bold text-[#fbfff7] hover:bg-white/10 transition-colors">
                  About Star
                </a>
              </div>
            </div>

            <div class="surface-panel rounded-lg p-5 text-[#17211a]">
              <div class="grid gap-3">
                <div class="rounded-lg bg-[#edf7df] border border-[#70805c]/20 p-5 flex items-start gap-4">
                  <div class="w-11 h-11 rounded-lg bg-[#17211a] text-[#c8f269] flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h10zm0 0h2.5a2.5 2.5 0 005 0H21v-5l-3-3h-5v8zM7.5 19a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm10 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg font-extrabold">Fast delivery</h2>
                    <p class="text-sm text-[#5f7656] mt-1">Reliable shipping from Star to your door.</p>
                  </div>
                </div>

                <div class="rounded-lg bg-[#fbfff7] border border-[#70805c]/20 p-5 flex items-start gap-4">
                  <div class="w-11 h-11 rounded-lg bg-[#17211a] text-[#c8f269] flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3l2.4 5.1 5.6.8-4 3.9.9 5.5L12 15.7 7.1 18.3l.9-5.5-4-3.9 5.6-.8L12 3z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg font-extrabold">Quality products</h2>
                    <p class="text-sm text-[#5f7656] mt-1">Clear details, clean product pages, confident choices.</p>
                  </div>
                </div>

                <div class="rounded-lg bg-[#f2d7c3] border border-[#70805c]/20 p-5 flex items-start gap-4">
                  <div class="w-11 h-11 rounded-lg bg-[#17211a] text-[#c8f269] flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 3l7 3v5c0 4.4-2.8 8.4-7 10-4.2-1.6-7-5.6-7-10V6l7-3zm-3 9l2 2 4-5"/>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg font-extrabold">Secure checkout</h2>
                    <p class="text-sm text-[#5f7656] mt-1">Simple cart and checkout screens for easy ordering.</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 flex items-center justify-between border-t border-[#70805c]/20 pt-4">
                <span class="text-sm text-[#5f7656]">Ready catalog</span>
                <span class="text-sm font-extrabold">{{ products().length }} items</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products Grid -->
      <section id="products" class="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div class="flex items-end justify-between mb-10">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#5f7656] mb-2">Catalog</p>
            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight text-[#17211a]">All Products</h2>
            <p class="text-[#5f7656] mt-1">{{ products().length }} items available</p>
          </div>
        </div>

        @if (isLoading()) {
          <!-- Skeleton Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (i of skeletons; track i) {
              <div class="rounded-2xl overflow-hidden">
                <div class="skeleton h-64 w-full"></div>
                <div class="p-4">
                  <div class="skeleton h-4 w-3/4 mb-2"></div>
                  <div class="skeleton h-4 w-1/2 mb-3"></div>
                  <div class="skeleton h-10 w-full rounded-xl"></div>
                </div>
              </div>
            }
          </div>
        } @else if (products().length === 0) {
          <div class="text-center py-20 surface-panel rounded-lg">
            <div class="w-16 h-16 mx-auto mb-4 bg-[#edf7df] rounded-lg flex items-center justify-center">
              <svg class="w-8 h-8 text-[#5f7656]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-[#17211a]">No products yet</h3>
            <p class="text-[#5f7656] mt-1">Check back later for new arrivals</p>
          </div>
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (product of products(); track product.id) {
              <div class="group surface-panel rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <!-- Product Image -->
                <a [routerLink]="['/product', product.id]" class="block relative overflow-hidden aspect-square bg-[#edf7df]">
                  @if (product.thumbnail) {
                    <img [src]="product.thumbnail" [alt]="product.title"
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  } @else {
                    <div class="w-full h-full flex items-center justify-center">
                      <svg class="w-16 h-16 text-[#94a984]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  }
                  @if (product.stock <= 5 && product.stock > 0) {
                    <span class="absolute top-3 left-3 px-2.5 py-1 bg-[#17211a] text-[#c8f269] text-[10px] font-bold uppercase tracking-wider rounded">
                      Low Stock
                    </span>
                  }
                  @if (product.stock === 0) {
                    <div class="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <span class="px-3 py-1.5 bg-[#17211a] text-[#fbfff7] text-xs font-bold uppercase tracking-wider rounded">
                        Out of Stock
                      </span>
                    </div>
                  }
                </a>

                <!-- Product Info -->
                <div class="p-4">
                  <div class="flex items-start justify-between gap-2 mb-1">
                    <a [routerLink]="['/product', product.id]" class="text-sm font-bold text-[#17211a] hover:text-[#2e4a33] line-clamp-1">
                      {{ product.title }}
                    </a>
                  </div>
                  @if (product.category) {
                    <p class="text-xs text-[#5f7656] uppercase tracking-wider mb-3">{{ product.category }}</p>
                  }
                  <div class="flex items-center justify-between">
                    <span class="text-lg font-extrabold text-[#17211a]">{{ product.price | number:'1.2-2' }} MAD</span>
                    <button
                      (click)="addToCart(product)"
                      [disabled]="product.stock === 0 || addingId() === product.id"
                      class="px-4 py-2 btn-primary text-xs font-bold uppercase tracking-wider rounded-lg disabled:bg-[#c9d1c2] disabled:text-[#5f7656] disabled:cursor-not-allowed transition-all duration-200 active:scale-95">
                      @if (addingId() === product.id) {
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                      } @else {
                        Add
                      }
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly auth = inject(AuthService);

  readonly products = signal<Product[]>([]);
  readonly isLoading = signal(true);
  readonly addingId = signal<number | null>(null);
  readonly skeletons = [0, 1, 2, 3, 4, 5, 6, 7];

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  addToCart(product: Product): void {
    this.addingId.set(product.id);
    this.cartService.addToCart(product.id).subscribe({
      next: () => this.addingId.set(null),
      error: () => this.addingId.set(null)
    });
  }
}
