import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
    { path: '', component: ProductListComponent },
    {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
    },
    { path: '**', redirectTo: '' }
];
