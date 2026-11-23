import { Component, inject, ChangeDetectionStrategy, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.interface';

@Component({
    selector: 'app-add-category',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './add-category.component.html',
    styleUrl: './add-category.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent {
    private categoryService = inject(CategoryService);
    private fb = inject(FormBuilder);

    addCategory = output<Category>();

    categoryForm = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(5)]]
    });

    createCategory() {
        if (this.categoryForm.valid) {
            const { name, description } = this.categoryForm.getRawValue();
            this.categoryService.addCategory(name, description);
           /*
           this.addCategory.emit(category)
                this.categoryForm.reset();*/
        }
    }
}
