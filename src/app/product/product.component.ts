import { Component, OnInit } from '@angular/core';
import {
  EServiceService,
  Product,
  CartDto,
  CartItemDto
} from '../Service/eservice.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  cart: CartDto | null = null;
  userId!: string;
  showCart = false;

  constructor(private svc: EServiceService) {}

  ngOnInit() {
    this.ensureUserId();
    this.loadProducts();
    this.loadOrCreateCart();
  }

    private ensureUserId() {
    const key = 'sterling-userId';
    let uid = localStorage.getItem(key);
    if (!uid) {
      // generate a simple GUID-like string
      uid = 'xxxxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      localStorage.setItem(key, uid);
    }
    this.userId = uid;
  }

  loadProducts() {
    this.svc.getProducts().subscribe(p => this.products = p);
  }

  loadOrCreateCart() {
    this.svc.getCart(this.userId).subscribe({
      next: c => this.cart = c,
      error: _ => this.svc.createCart(this.userId).subscribe(c => this.cart = c)
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  addToCart(prod: Product) {
    if (!this.cart) return;
    const existing = this.cart.items.find(i => i.productId === prod.id);
    if (existing) {
      existing.quantity++;
      this.svc.updateCartItem(existing).subscribe();
    } else {
      this.svc.addCartItem({
        productId: prod.id,
        price: prod.price,
        quantity: 1,
        cartId: this.cart.id
      }).subscribe(i => this.cart!.items.push(i));
    }
  }

  increase(item: CartItemDto) {
    item.quantity++;
    this.svc.updateCartItem(item).subscribe();
  }

  decrease(item: CartItemDto) {
    if (item.quantity > 1) {
      item.quantity--;
      this.svc.updateCartItem(item).subscribe();
    } else {
      this.remove(item);
    }
  }

  remove(item: CartItemDto) {
    this.svc.deleteCartItem(item.id).subscribe(() =>
      this.cart!.items = this.cart!.items.filter(i => i.id !== item.id)
    );
  }

  clear() {
    this.svc.clearCart(this.userId).subscribe(() => this.cart!.items = []);
  }

  get totalItems() {
    return this.cart?.items.reduce((sum, i) => sum + i.quantity, 0) || 0;
  }

  get totalPrice() {
    return this.cart?.items.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;
  }

}
