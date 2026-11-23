import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { CategoryListComponent } from '../category-list/category-list.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductCardComponent, AddProductComponent, CategoryListComponent, EditProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = this.productService._products;
  showCategories = signal(false);
  editingProduct = signal<Product | null>(null);

  ngOnInit(): void {
    this.productService.getProducts().subscribe
            ((product) => this.products.set(product));
  }

  toggleCategories() {
    this.showCategories.update(v => !v);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeProduct(id: number) {
    if (confirm('Are you sure you want to remove this product?')) {
      this.productService.removeProduct(id);
    }
  }

  handleEditProduct(product: Product) {
    this.editingProduct.set(product);
  }

  closeEdit() {
    this.editingProduct.set(null);
  }
}
