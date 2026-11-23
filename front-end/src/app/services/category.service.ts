import { inject, Injectable, signal, Signal } from '@angular/core';
import { Category } from '../models/category.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    public _categories = signal<Category[]>([]);

    private httpClient = inject(HttpClient);

    getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(`/api/categories`);
    }

    addCategory(name: string, description: string) {
        this.httpClient.post<Category>(`/api/category`,{"name":name,"description":description}).subscribe(category => {
                this._categories.update(categories => {
                    return [...categories, category];
                });
        });
    }

    removeCategory(id: number) {
        this.httpClient.delete('/api/category/'+id).subscribe(() => {
            this._categories.update(categories => categories.filter(c => c.id !== id));
        });
    }

    updateCategory(id: number, updates: Partial<Category>) {
        updates.id = id;
        this.httpClient.put<Category>(`/api/category`, updates).subscribe((category)=>{
            this._categories.update(categories =>
                categories.map(c => c.id === id ? { ...c, ...category } : c)
            );
        });
    }
}
