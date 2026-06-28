import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly auth = inject(AuthService);

  readonly product = signal<Product | null>(null);
  readonly isLoading = signal(true);
  readonly isAdding = signal(false);
  readonly quantity = signal(1);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getById(id).subscribe({
        next: (p) => { this.product.set(p); this.isLoading.set(false); },
        error: () => this.isLoading.set(false)
      });
    }
  }

  incrementQty(): void {
    const max = this.product()?.stock ?? 1;
    if (this.quantity() < max) this.quantity.update(q => q + 1);
  }

  decrementQty(): void {
    if (this.quantity() > 1) this.quantity.update(q => q - 1);
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.isAdding.set(true);
    this.cartService.addToCart(p.id, this.quantity()).subscribe({
      next: () => this.isAdding.set(false),
      error: () => this.isAdding.set(false)
    });
  }
}
