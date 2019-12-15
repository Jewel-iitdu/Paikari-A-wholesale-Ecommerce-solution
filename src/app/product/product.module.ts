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
import { SingleProductViewComponent } from './components/single-product-view/single-product-view.component';
import { AuthGuard } from '../core/security-service/auth.guard';
import { SupplierGuard } from '../core/security-service/supplier.guard';
import { CustomerGuard } from '../core/security-service/customer.guard';

const routes:Routes=[
  // {
  //   path:'',
  //   redirectTo:'product-list'
  // },

  {
		path: 'add-products',
    component:AddProductComponent,
    canActivate:[AuthGuard,SupplierGuard]
  },
  {
		path: 'modify-products',
    component:ModifyProductComponent,
    canActivate:[AuthGuard,SupplierGuard]
  },
  {
    path: 'product-list',
    component:ProductListComponent,
    canActivate:[AuthGuard,SupplierGuard]
  },
  {
    path: 'product-list/edit-product/:id',
    component: ModifyProductComponent,
    canActivate:[AuthGuard,SupplierGuard]
  },
  {
    path: 'product-list/product/:id',
    component: SingleProductViewComponent,
    canActivate:[AuthGuard,SupplierGuard,CustomerGuard]
  }

]

@NgModule({
  declarations: [AddProductComponent, ModifyProductComponent, ProductListComponent, DropZoneDirective, FileSizePipe, ProductCardComponent, SingleProductViewComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    SharedModule
    
  ],
  providers:[ProductService]
})
export class ProductModule { }
