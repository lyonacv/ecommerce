import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
  remove = output<number>();
  edit = output<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product());
  }

  onRemove() {
    this.remove.emit(this.product().id);
  }

  onEdit(event: MouseEvent) {
    event.stopPropagation();
    this.edit.emit(this.product());
  }
}
