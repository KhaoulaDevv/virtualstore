import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Order } from '../models/order.model';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly baseUrl = `${environment.apiUrl}/orders`;

  placeOrder(): Observable<Order> {
    const userId = this.auth.getUserId();
    if (!userId) return throwError(() => new Error('Not authenticated'));

    const params = new HttpParams().set('userId', userId.toString());

    return this.http.post<Order>(`${this.baseUrl}/place`, null, { params }).pipe(
      tap(() => {
        this.toast.success('Order placed successfully!');
      }),
      catchError(err => {
        this.toast.error('Failed to place order. Please try again.');
        return throwError(() => err);
      })
    );
  }

  getUserOrders(): Observable<Order[]> {
    const userId = this.auth.getUserId();
    if (!userId) return throwError(() => new Error('Not authenticated'));

    return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }
}
