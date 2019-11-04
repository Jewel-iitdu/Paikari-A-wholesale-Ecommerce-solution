import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  date: string;
  transactionId: number;
  amount: number;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { transactionId: 1, date: "Hydrogen", amount: 1.0079, status: "H" },
  { transactionId: 2, date: "Helium", amount: 4.0026, status: "He" },
  { transactionId: 3, date: "Lithium", amount: 6.941, status: "Li" },
  { transactionId: 4, date: "Beryllium", amount: 9.0122, status: "Be" },
  { transactionId: 5, date: "Boron", amount: 10.811, status: "B" },
  { transactionId: 6, date: "Carbon", amount: 12.0107, status: "C" },
  { transactionId: 7, date: "Nitrogen", amount: 14.0067, status: "N" },
  { transactionId: 8, date: "Oxygen", amount: 15.9994, status: "O" },
  { transactionId: 9, date: "Fluorine", amount: 18.9984, status: "F" },
  { transactionId: 10, date: "Neon", amount: 20.1797, status: "Ne" }
];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ["transactionId", "date", "amount", "status"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openWithdrawRequestWindow(){
    // this.withdrawRequestModalService.openWithdrawRequestModal();
  }

}
