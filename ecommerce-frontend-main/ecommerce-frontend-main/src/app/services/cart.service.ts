import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError, of, map } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly productService = inject(ProductService);
  private readonly baseUrl = `${environment.apiUrl}/cart`;

  private readonly _cartItemCount = signal(0);
  private readonly _cart = signal<Cart | null>(null);
  private readonly _isLoading = signal(false);

  readonly cartItemCount = computed(() => this._cartItemCount());
  readonly cart = computed(() => this._cart());
  readonly isLoading = computed(() => this._isLoading());

  loadCart(): void {
    const userId = this.auth.getUserId();
    if (!userId) {
      const stored = localStorage.getItem('guest_cart');
      if (stored) {
        try {
          const cart = JSON.parse(stored) as Cart;
          this._cart.set(cart);
          this._cartItemCount.set(cart.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0);
        } catch (e) { }
      }
      return;
    }

    this._isLoading.set(true);
    this.http.get<Cart>(`${environment.apiUrl}/users/${userId}/cart`).pipe(
      catchError(err => {
        this._isLoading.set(false);
        return throwError(() => err);
      })
    ).subscribe({
      next: (cart) => {
        this._cart.set(cart);
        this._cartItemCount.set(
          cart.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
        );
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      }
    });
  }

  addToCart(productId: number, quantity: number = 1): Observable<Cart> {
    const userId = this.auth.getUserId();
    if (!userId) {
      return this.productService.getById(productId).pipe(
        tap(product => {
          let cart = this._cart() || { id: 0, cartItems: [] };
          const cartItems = [...cart.cartItems];
          const existing = cartItems.find(i => i.product.id === productId);
          if (existing) {
            existing.quantity += quantity;
          } else {
            cartItems.push({ id: Date.now(), product, quantity });
          }
          cart = { ...cart, cartItems };
          this._cart.set(cart);
          this._cartItemCount.set(cart.cartItems.reduce((sum, item) => sum + item.quantity, 0));
          localStorage.setItem('guest_cart', JSON.stringify(cart));
          this.toast.success('Added to cart');
        }),
        map(() => this._cart()!)
      );
    }

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());

    return this.http.post<Cart>(`${this.baseUrl}/add`, null, { params }).pipe(
      tap(cart => {
        this._cart.set(cart);
        this._cartItemCount.set(
          cart.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
        );
        this.toast.success('Added to cart');
      }),
      catchError(err => {
        this.toast.error('Failed to add to cart');
        return throwError(() => err);
      })
    );
  }

  updateQuantity(productId: number, quantity: number): Observable<Cart> {
    const userId = this.auth.getUserId();
    if (!userId) {
      const cart = this._cart();
      if (cart) {
        const cartItems = [...cart.cartItems];
        const item = cartItems.find(i => i.product.id === productId);
        if (item) item.quantity = quantity;
        const newCart = { ...cart, cartItems };
        this._cart.set(newCart);
        this._cartItemCount.set(newCart.cartItems.reduce((sum, item) => sum + item.quantity, 0));
        localStorage.setItem('guest_cart', JSON.stringify(newCart));
      }
      return of(this._cart()!);
    }

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString())
      .set('quantity', quantity.toString());

    return this.http.put<Cart>(`${this.baseUrl}/update`, null, { params }).pipe(
      tap(cart => {
        this._cart.set(cart);
        this._cartItemCount.set(
          cart.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
        );
      }),
      catchError(err => {
        this.toast.error('Failed to update cart');
        return throwError(() => err);
      })
    );
  }

  removeItem(productId: number): Observable<Cart> {
    const userId = this.auth.getUserId();
    if (!userId) {
      const cart = this._cart();
      if (cart) {
        const cartItems = cart.cartItems.filter(i => i.product.id !== productId);
        const newCart = { ...cart, cartItems };
        this._cart.set(newCart);
        this._cartItemCount.set(newCart.cartItems.reduce((sum, item) => sum + item.quantity, 0));
        localStorage.setItem('guest_cart', JSON.stringify(newCart));
        this.toast.success('Item removed from cart');
      }
      return of(this._cart()!);
    }

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString());

    return this.http.delete<Cart>(`${this.baseUrl}/remove`, { params }).pipe(
      tap(cart => {
        this._cart.set(cart);
        this._cartItemCount.set(
          cart.cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0
        );
        this.toast.success('Item removed from cart');
      }),
      catchError(err => {
        this.toast.error('Failed to remove item');
        return throwError(() => err);
      })
    );
  }

  clearCart(): Observable<Cart> {
    const userId = this.auth.getUserId();
    if (!userId) {
      const newCart = { id: 0, cartItems: [] };
      this._cart.set(newCart);
      this._cartItemCount.set(0);
      localStorage.removeItem('guest_cart');
      return of(newCart);
    }

    const params = new HttpParams().set('userId', userId.toString());

    return this.http.delete<Cart>(`${this.baseUrl}/clear`, { params }).pipe(
      tap(cart => {
        this._cart.set(cart);
        this._cartItemCount.set(0);
      }),
      catchError(err => {
        this.toast.error('Failed to clear cart');
        return throwError(() => err);
      })
    );
  }

  syncGuestCart(): void {
    const stored = localStorage.getItem('guest_cart');
    if (!stored) return;
    const userId = this.auth.getUserId();
    if (!userId) return;

    try {
      const cart = JSON.parse(stored) as Cart;
      localStorage.removeItem('guest_cart');
      if (!cart.cartItems || cart.cartItems.length === 0) return;

      // Simple sync: add all local items to backend
      cart.cartItems.forEach(item => {
        this.addToCart(item.product.id, item.quantity).subscribe();
      });
    } catch (e) { }
  }

  getCartTotal(): number {
    const cart = this._cart();
    if (!cart?.cartItems) return 0;
    return cart.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}
