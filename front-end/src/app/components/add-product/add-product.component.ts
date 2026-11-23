import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.interface';

@Component({
    selector: 'app-add-product',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule],
    templateUrl: './add-product.component.html',
    styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
    private productService = inject(ProductService);
    private categoryService = inject(CategoryService);
    private fb = inject(FormBuilder);

    //categories = this.categoryService.getCategories();
    isAddingProduct = signal(false);

    productForm = this.fb.group({
        title: ['', Validators.required],
        price: [null as number | null, [Validators.required, Validators.min(0)]],
        category: [null as number | null, Validators.required],
        description: ['', Validators.required],
        // Default image for convenience
        image: ['https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', Validators.required]
    });

    categories = this.categoryService._categories; 

    ngOnInit() {
        this.categoryService.getCategories().subscribe((data) => {
            this.categories.set(data)}
        );
    }

    toggleAddProduct() {
        this.isAddingProduct.update(v => !v);
    }

    createProduct() {
        if (this.productForm.invalid) return;

        const formValue = this.productForm.getRawValue();
        const selectedCategory = this.categories().find(c => c.id == formValue.category);

        if (!selectedCategory) return;

        this.productService.addProduct({
            title: formValue.title!,
            price: formValue.price!,
            category: selectedCategory,
            description: formValue.description!,
            image: formValue.image!
        });

        // Reset form
        this.productForm.reset({
            title: '',
            price: null,
            category: null,
            description: '',
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
        });
        this.isAddingProduct.set(false);
    }
}
