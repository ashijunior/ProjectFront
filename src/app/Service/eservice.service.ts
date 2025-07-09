import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
}

export interface CartDto {
  id: number;
  userId: string;
  items: CartItemDto[];
  total: number;
}

export interface CartItemDto {
subTotal: any;
pictureUrl: any;
productName: any;
  id: number;
  price: number;
  quantity: number;
  cartId: number;
  productId: number;
  product?: Product;
}

@Injectable({ providedIn: 'root' })
export class EServiceService {
  private base = 'https://localhost:7285/api/';

  constructor(private http: HttpClient) {}

  // Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}Product/GetProducts`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}Product/GetProductBy/${id}`);
  }

  // Cart
  getCart(userId: string): Observable<CartDto> {
    return this.http.get<CartDto>(`${this.base}Cart/GetCartBy/${userId}`);
  }
  createCart(userId: string): Observable<CartDto> {
    return this.http.post<CartDto>(
      `${this.base}Cart/CreateCart`,
      JSON.stringify(userId),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  clearCart(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}Cart/ClearCartBy/${userId}`);
  }

  // Cart Items
  addCartItem(item: Partial<CartItemDto>): Observable<CartItemDto> {
    return this.http.post<CartItemDto>(`${this.base}CartItem`, item);
  }
  updateCartItem(item: CartItemDto): Observable<CartItemDto> {
    return this.http.put<CartItemDto>(`${this.base}CartItem/${item.id}`, item);
  }
  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}CartItem/${id}`);
  }
}
