import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _currentUser = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private readonly _isLoading = signal(false);

  readonly currentUser = computed(() => this._currentUser());
  readonly token = computed(() => this._token());
  readonly isAuthenticated = computed(() => !!this._token());
  readonly isAdmin = computed(() => this._currentUser()?.role === 'ADMIN');
  readonly isLoading = computed(() => this._isLoading());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    if (token && userStr) {
      try {
        this._token.set(token);
        this._currentUser.set(JSON.parse(userStr));
      } catch {
        this.clearStorage();
      }
    }
  }

  private saveToStorage(token: string, user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  }

  private clearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    this._isLoading.set(true);
    return this.http.post<{ token: string; user: User }>(`${environment.apiUrl}/users/login`, credentials).pipe(
      tap(response => {
        this._token.set(response.token);
        this._currentUser.set(response.user);
        this.saveToStorage(response.token, response.user);
        this._isLoading.set(false);
        this.toast.success('Welcome back, ' + response.user.username + '!');
      }),
      map(response => response.user),
      catchError(err => {
        this._isLoading.set(false);
        this.toast.error('Invalid email or password');
        return throwError(() => err);
      })
    );
  }

  register(data: RegisterRequest): Observable<User> {
    this._isLoading.set(true);
    return this.http.post<User>(`${environment.apiUrl}/users/register`, data).pipe(
      tap(user => {
        this._isLoading.set(false);
        this.toast.success('Account created! Please log in.');
      }),
      catchError(err => {
        this._isLoading.set(false);
        this.toast.error('Registration failed. Email may already be in use.');
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    this._currentUser.set(null);
    this._token.set(null);
    this.clearStorage();
    this.toast.success('You have been logged out');
    this.router.navigate(['/login']);
  }

  getUserId(): number | null {
    return this._currentUser()?.id ?? null;
  }
}
