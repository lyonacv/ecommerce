import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.interface';
import { CartItem } from '../models/cart-item.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
    readonly cartItems = signal<CartItem[]>([]);

    readonly totalItems = computed<number>(() =>
        this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
    );

    readonly totalPrice = computed<number>(() =>
        this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    );

    addToCart(product: Product) {
        this.cartItems.update(items => {
            const existing = items.find(i => i.product.id === product.id);
            if (existing) {
                return items.map(i => i.product.id === product.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                );
            }
            return [...items, { product, quantity: 1 }];
        });
    }

    removeFromCart(productId: number) {
        this.cartItems.update(items => items.filter(i => i.product.id !== productId));
    }

    updateQuantity(productId: number, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        this.cartItems.update(items => items.map(i =>
            i.product.id === productId ? { ...i, quantity } : i
        ));
    }
}
