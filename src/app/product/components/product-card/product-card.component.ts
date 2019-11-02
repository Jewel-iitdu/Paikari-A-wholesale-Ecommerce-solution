import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  // @Input('product') product: Product;
  // @Input('show-actions') showActions = true;
  // @Input('shopping-cart') shoppingCart: ShoppingCart; 

  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    // this.cartService.addToCart(this.product);
  }
}
