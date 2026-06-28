import { Product } from './product.model';

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  createdAt: string;
  orderItems: OrderItem[];
}
