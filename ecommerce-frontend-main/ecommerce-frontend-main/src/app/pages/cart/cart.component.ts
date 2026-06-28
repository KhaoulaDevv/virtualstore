import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  readonly cartService = inject(CartService);
  readonly updatingId = signal<number | null>(null);
  readonly removingId = signal<number | null>(null);

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  get items(): CartItem[] {
    return this.cartService.cart()?.cartItems ?? [];
  }

  get total(): number {
    return this.cartService.getCartTotal();
  }

  updateQty(item: CartItem, delta: number): void {
    const newQty = item.quantity + delta;
    if (newQty < 1 || newQty > item.product.stock) return;
    this.updatingId.set(item.product.id);
    this.cartService.updateQuantity(item.product.id, newQty).subscribe({
      next: () => this.updatingId.set(null),
      error: () => this.updatingId.set(null)
    });
  }

  removeItem(item: CartItem): void {
    this.removingId.set(item.product.id);
    this.cartService.removeItem(item.product.id).subscribe({
      next: () => this.removingId.set(null),
      error: () => this.removingId.set(null)
    });
  }
}
