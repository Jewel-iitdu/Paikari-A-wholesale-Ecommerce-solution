import { ProductService } from './services/product.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ModifyProductComponent } from './components/modify-product/modify-product.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

const routes:Routes=[
  {
    path:'',
    redirectTo:'product-list'
  },

  {
		path: 'add-products',
		component:AddProductComponent
  },
  {
		path: 'modify-products',
		component:ModifyProductComponent
  },
  {
    path: 'product-list',
    component:ProductListComponent
  }

]

@NgModule({
  declarations: [AddProductComponent, ModifyProductComponent, ProductListComponent, DropZoneDirective, FileSizePipe, ProductCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    
  ],
  providers:[ProductService]
})
export class ProductModule { }
