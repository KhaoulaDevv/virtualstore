import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly toast = inject(ToastService);
  readonly auth = inject(AuthService);

  readonly products = signal<Product[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly showForm = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly deletingId = signal<number | null>(null);
  readonly searchQuery = signal('');

  form: Partial<Product> = this.emptyForm();

  ngOnInit(): void {
    this.loadProducts();
  }

  private emptyForm(): Partial<Product> {
    return { sku: '', title: '', description: '', price: 0, category: '', thumbnail: '', stock: 0 };
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productService.getAll().subscribe({
      next: (products) => { this.products.set(products); this.isLoading.set(false); },
      error: () => { this.toast.error('Failed to load products'); this.isLoading.set(false); }
    });
  }

  get filteredProducts(): Product[] {
    const q = this.searchQuery().toLowerCase();
    if (!q) return this.products();
    return this.products().filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }

  openAddForm(): void {
    this.form = this.emptyForm();
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEditForm(product: Product): void {
    this.form = { ...product };
    this.editingId.set(product.id);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.form = this.emptyForm();
  }

  saveProduct(): void {
    if (!this.form.title || !this.form.sku) {
      this.toast.error('Title and SKU are required');
      return;
    }

    this.isSaving.set(true);
    const id = this.editingId();

    if (id) {
      this.productService.update(id, this.form).subscribe({
        next: () => {
          this.toast.success('Product updated');
          this.isSaving.set(false);
          this.closeForm();
          this.loadProducts();
        },
        error: () => { this.toast.error('Failed to update product'); this.isSaving.set(false); }
      });
    } else {
      this.productService.create(this.form).subscribe({
        next: () => {
          this.toast.success('Product created');
          this.isSaving.set(false);
          this.closeForm();
          this.loadProducts();
        },
        error: (err) => { 
          console.error('Create product error:', err);
          let msg = 'Failed to create product';
          if (typeof err.error === 'string') {
            msg = err.error;
          } else if (err.error?.message) {
            msg = err.error.message;
          } else if (err.error?.error) {
            msg = err.error.error;
          } else if (err.message) {
            msg = err.message;
          }
          this.toast.error(msg); 
          this.isSaving.set(false); 
        }
      });
    }
  }

  deleteProduct(product: Product): void {
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;

    this.deletingId.set(product.id);
    this.productService.delete(product.id).subscribe({
      next: () => {
        this.toast.success('Product deleted');
        this.deletingId.set(null);
        this.loadProducts();
      },
      error: () => { this.toast.error('Failed to delete product'); this.deletingId.set(null); }
    });
  }

  getCategories(): string[] {
    const cats = new Set(this.products().map(p => p.category).filter(Boolean));
    return [...cats];
  }
}
