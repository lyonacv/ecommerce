import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Category } from '../../models/category.interface';

@Component({
    selector: 'app-category-card',
    standalone: true,
    templateUrl: './category-card.component.html',
    styleUrl: './category-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
    category = input.required<Category>();
    remove = output<number>();
    edit = output<Category>();

    onRemove(event: MouseEvent) {
        event.stopPropagation();
        this.remove.emit(this.category().id);
    }

    onEdit(event: MouseEvent) {
        event.stopPropagation();
        this.edit.emit(this.category());
    }
}
