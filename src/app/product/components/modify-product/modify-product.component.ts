import { ProductService } from './../../services/product.service';
import { Item } from './../../../config/interfaces/item.interface';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  item: Item = {
    title: '',
    description:''
  }
  ProductService: ProductService;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
  }
  onSubmit(){
    // if(this.item.title != '' && this.item.description != ''){
    //   this.ProductService.addItem(this.item);
    //   this.item.title = '';
    //   this.item.description = '';
    // }
    this.ProductService.addItem(this.item);
    console.log(this.item);
}
}
