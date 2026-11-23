import { Component, inject, input, output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.interface';

@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './edit-product.component.html',
    styleUrl: './edit-product.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProductComponent implements OnInit {
    private fb = inject(FormBuilder);
    private productService = inject(ProductService);
    private categoryService = inject(CategoryService);

    product = input.required<Product>();
    categories = this.categoryService._categories;
    close = output<void>();

    editForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.required, Validators.min(0.01)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        categoryId: [0, [Validators.required, Validators.min(1)]]
    });
    
    ngOnInit() {
        console.log(this.categories());
        this.categoryService.getCategories().subscribe(data => this.categories.set(data));
        const p = this.product();
        this.editForm.patchValue({
            title: p.title,
            price: p.price,
            description: p.description,
            categoryId: p.category.id
        });
    }

    save() {
        if (this.editForm.valid) {
            const formValue = this.editForm.getRawValue();
            const selectedCategory = this.categories().find(c => c.id === Number(formValue.categoryId));

            if (selectedCategory) {
                this.productService.updateProduct({
                    id : this.product().id,
                    title: formValue.title!,
                    price: formValue.price!,
                    description: formValue.description!,
                    category: selectedCategory
                });
                this.close.emit();
            }
        }
    }

    cancel() {
        this.close.emit();
    }
}
