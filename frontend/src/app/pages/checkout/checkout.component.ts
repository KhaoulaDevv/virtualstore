import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  readonly isPlacing = signal(false);
  readonly shippingInfo = signal({ fullName: '', address: '', city: '', zip: '', phone: '' });

  get items() { return this.cartService.cart()?.cartItems ?? []; }
  get total() { return this.cartService.getCartTotal(); }
  get itemCount() { return this.cartService.cartItemCount(); }

  placeOrder(): void {
    this.isPlacing.set(true);
    this.orderService.placeOrder().subscribe({
      next: () => {
        this.cartService.loadCart();
        this.isPlacing.set(false);
        this.router.navigate(['/orders']);
      },
      error: () => this.isPlacing.set(false)
    });
  }
}
