import { Component, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
    selector: 'app-category-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CategoryCardComponent, AddCategoryComponent],
    templateUrl: './category-list.component.html',
    styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
    private categoryService = inject(CategoryService);
    categories = this.categoryService._categories

    ngOnInit() {
        this.categoryService.getCategories()
        .subscribe(data => this.categories.set(data))
    }

    handleRemove(id: number) {
        if (confirm('Are you sure you want to remove this category?')) {
            this.categoryService.removeCategory(id);
        }
    }

    handleEdit(cat: Category) {
        const newName = prompt('Update category name:', cat.name);
        const newDesc = prompt('Update category description:', cat.description);

        if (newName !== null && newDesc !== null) {
            this.categoryService.updateCategory(cat.id, {
                id : cat.id,
                name: newName || cat.name,
                description: newDesc || cat.description
            });
        }
    }

    addToCategory(cat: Category) {
        this.categories.update(categories => {
            categories.push(cat)
            return categories;
        });
    }
}
