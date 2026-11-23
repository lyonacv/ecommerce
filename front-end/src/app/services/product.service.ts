import { inject, Injectable, signal, Signal } from '@angular/core';
import { Product } from '../models/product.interface';
import { Category } from '../models/category.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public _products = signal<Product[]>([]);

    private httpClient = inject(HttpClient)

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>('/api/products');
    }

    addProduct(newProduct: Omit<Product, 'id' | 'rating'>) {
        this.httpClient.post<Product>('/api/product',newProduct).subscribe((product)=>{
            this._products.update(products => {
                const prod: Product = {
                ...product,
                rating: { rate: 0, count: 0 }
            };
            return [...products, prod];
        });
        });
    }

    removeProduct(id: number) {
        this.httpClient.delete('/api/product/'+id).subscribe((response) => {
            console.log('delete',response)
            this._products.update(products => products.filter(p => p.id !== id));
        });
    }

    updateProduct(updates: Partial<Product>) {
        this.httpClient.put('/api/product', updates).subscribe(() => {
            this._products.update(products =>
                products.map(p => p.id === updates.id ? {...p, ...updates} : p)
            );
        });

    }
}
