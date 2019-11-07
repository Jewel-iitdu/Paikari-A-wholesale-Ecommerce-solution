import { ProductService } from "./../../services/product.service";
import { ProductInformation } from "src/app/config/interfaces/product.interface";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

export interface PeriodicElement {
  productname: string;
  productprice: string;
  created: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { productname: "Hello", productprice: "BDT 200", created: "2019-1-5" },
  { productname: "Hello1", productprice: "BDT 2200", created: "2019-1-5" },
  { productname: "Hello2", productprice: "BDT 2100", created: "2019-1-5" },
  { productname: "Hello3", productprice: "BDT 200", created: "2019-1-5" },
  { productname: "Hello4", productprice: "BDT 2200", created: "2019-1-5" },
  { productname: "Hello5", productprice: "BDT 6200", created: "2019-1-5" },
  { productname: "Hello6", productprice: "BDT 9200", created: "2019-1-5" },
  { productname: "Hello7", productprice: "BDT 7200", created: "2019-1-5" },
  { productname: "Hello8", productprice: "BDT 22200", created: "2019-1-5" },
  { productname: "Hello9", productprice: "BDT 4200", created: "2019-1-5" }
];

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  products: ProductInformation[];

  displayedColumns: string[] = ["productname", "productprice", "created"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private productService: ProductService) {
    //   this.productService.getProductByUser().subscribe(
    //     list => {
    //         this.products = list.map(item => {
    //         return {
    //           id: item.payload.doc.id,
    //           ...item.payload.doc.data()
    //         } as ProductInformation;
    //       });
    // })
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openWithdrawRequestWindow() {
    // this.withdrawRequestModalService.openWithdrawRequestModal();
  }
}
