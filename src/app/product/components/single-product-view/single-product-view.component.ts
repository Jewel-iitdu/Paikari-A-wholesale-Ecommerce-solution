import { MatFormFieldModule } from "@angular/material";
import { map } from "rxjs/operators";
import { ProductService } from "./../../services/product.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { listChanges } from "angularfire2/database";
import { pipe, Observable } from "rxjs";
import { ProductInformation } from "src/app/config/interfaces/product.interface";

@Component({
  selector: "app-single-product-view",
  templateUrl: "./single-product-view.component.html",
  styleUrls: ["./single-product-view.component.scss"]
})
export class SingleProductViewComponent implements OnInit {
  productData: ProductInformation;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    let productId = this.route.snapshot.paramMap.get("id");
    if (productId) this.getProductby(productId);
  }

  ngOnInit() {}

  // getProduct(id) {
  //   this.productData = this.productService.getProductByProductID(id);
  //   console.log(this.productData);
  // }
  getProductby(productId) {
    this.productService.getProductByProductId(productId).subscribe(item => {
           this.productData = item;
           console.log(this.productData);
  
  })
}
}
