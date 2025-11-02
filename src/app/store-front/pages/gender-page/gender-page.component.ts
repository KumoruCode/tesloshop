import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from "@products/components/product-card/product-card.component";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  gender = toSignal(this.route.params.pipe(
    map(({gender}) => gender)
  ))

  productList = rxResource({
    request: () => ({genderProduct: this.gender()}),
    loader: ({request}) => this.productService.getProducts({limit: 10, offset: 0, gender: request.genderProduct})
  })

}
