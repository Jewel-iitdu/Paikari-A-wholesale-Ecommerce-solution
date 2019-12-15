import { Component, OnInit } from '@angular/core';
import { OrderInformation } from 'src/app/config/interfaces/order.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.scss']
})
export class OrderedListComponent implements OnInit {

  supplierID: string;
  supplierOrderList: OrderInformation;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.setOrderedItem();
  }
  setOrderedItem() {
    this.orderService.getUserId().subscribe(id=>{
      this.supplierID = id;
      this.orderService.getOrderListBySupplierId(id).subscribe(list=>{
        this.supplierOrderList = list;
        console.log(list)
      })
    })
  }

}
