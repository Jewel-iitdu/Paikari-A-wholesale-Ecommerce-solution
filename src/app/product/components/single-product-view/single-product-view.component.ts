import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.scss']
})
export class SingleProductViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productService: ProductService) { 
    let id = this.route.snapshot.paramMap.get('id');
    if(id) this.productService.getProductByProductID();
  }

  ngOnInit() {
  }

}
