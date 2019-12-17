import { urlPaths } from './../../../config/constants/paikariConstants';
import { ProductService } from "./../../services/product.service";
import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';



@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  //products: ProductInformation[];

  displayedColumns: string[] = ["productname", "productprice", "created", "edit", "remove"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private productService: ProductService, private router: Router) {


    
  }
  ngOnInit() {
    this.productService.getProductBySupplier().subscribe(
      list => {
          const products = list.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          }
        });
        // console.log(products)
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  })
  }

  addProductClick(){
    this.router.navigate([urlPaths.Product.AddProduct.url]);
  }

  removeProduct(id){
    this.productService.removeProductByID(id);
  }

 
}
