import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTableComponent } from '@products/components/productTable/productTable.component';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent],
  templateUrl: './products-admin-page.component.html',
  styleUrl: './products-admin-page.component.css'
})
export class ProductsAdminPageComponent {

private productsService = inject(ProductsService);

productResource = rxResource({
  request: () => ({}),
  loader: ({ request }) =>{
    return this.productsService.getProducts({});
  },
})

}
