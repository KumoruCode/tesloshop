import { SlicePipe } from '@angular/common';
import { Component,  computed,  input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent{

getImage() {
  if(!this.product()?.images[0]) return
  return this.product()!.images[0]
}

  baserUrl = environment.baseUrl;

  product = input.required<Product>()

  imageUrl = computed(() => {
    return `${this.baserUrl}/files/product/${this.getImage()}`
  })



}
