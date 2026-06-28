import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error';
  exiting: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly platformId = inject(PLATFORM_ID);
  private counter = 0;
  private readonly _toasts = signal<ToastItem[]>([]);
  readonly toasts = computed(() => this._toasts());

  show(message: string, type: 'success' | 'error' = 'success', duration = 3000): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const id = ++this.counter;
    this._toasts.update(t => [...t, { id, message, type, exiting: false }]);

    setTimeout(() => this.dismiss(id), duration);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error', 4000);
  }

  dismiss(id: number): void {
    this._toasts.update(t =>
      t.map(toast => toast.id === id ? { ...toast, exiting: true } : toast)
    );
    setTimeout(() => {
      this._toasts.update(t => t.filter(toast => toast.id !== id));
    }, 300);
  }
}
