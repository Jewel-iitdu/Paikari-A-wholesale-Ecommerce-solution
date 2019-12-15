import { OrderService } from './../../../order/services/order.service';
import { SecurityService } from './../../../core/security-service/security.service';
import { SharedService } from './../../../shared/services/shared.service';
import { CustomerUserInformation } from './../../../config/interfaces/user.interface';
import { MatFormFieldModule } from '@angular/material';
import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listChanges } from 'angularfire2/database';
import { pipe, Observable } from 'rxjs';
import { ProductInformation } from 'src/app/config/interfaces/product.interface';
import { SelectorListContext } from '@angular/compiler';
import * as firebase from 'firebase/app';

@Component({
	selector: 'app-single-product-view',
	templateUrl: './single-product-view.component.html',
	styleUrls: [ './single-product-view.component.scss' ]
})
export class SingleProductViewComponent implements OnInit {
	productData: ProductInformation;
	supplierInfo: CustomerUserInformation;
	productObject;
	currentRole;
	userID;
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private sharedService: SharedService,
		private security: SecurityService,
		private order: OrderService
	) {
		let productId = this.route.snapshot.paramMap.get('id');
		if (productId) this.getProductby(productId);
	}

	ngOnInit() {
		this.setRole();
		this.setUserID();
	}
	setUserID() {
		this.order.getUserId().subscribe((res) => {
			this.userID = res;
		});
	}

	setRole() {
		this.security.getRole().subscribe((role) => {
			this.currentRole = role;
			console.log(role);
		});
	}
	// getProduct(id) {
	//   this.productData = this.productService.getProductByProductID(id);
	//   console.log(this.productData);
	// }
	getProductby(productId) {
		this.sharedService.showSpinner();

		this.productService.getProductByProductId(productId).subscribe(
			(item) => {
				// this.productObject = item;
				this.productData = item;
				console.log(this.productData);

				this.productService.getProfileBySupplierId(item.data.supplierId).subscribe(
					(res) => {
						this.supplierInfo = res.data;
						this.sharedService.hideSpinner();

						console.log(res);
					},
					(err) => {
						this.sharedService.hideSpinner();
					}
				);
			},
			(err) => {
				this.sharedService.hideSpinner();
			}
		);
	}
	// buyProduct(order) {
	//   debugger;
	//   this.order.createOrAddCart(order).subscribe(res=>{
	//     console.log(res);
	//   })
	// }

	buyProduct(product) {
		debugger;
		this.sharedService.showSpinner();
		this.order.getUserId().subscribe((res) => {
			this.userID = res;
			this.productObject = product;
			let orderInfo = {
				productID: this.productObject.id,
				orderQuantity: this.productObject.data.productquantity,
				payment: false,
				date: firebase.firestore.FieldValue.serverTimestamp(),
				customerID: this.userID,
				supplierID: this.productObject.data.supplierId
			};
			this.order.createOrAddCart(orderInfo).subscribe((res) => {
				this.sharedService.hideSpinner();
			},err=>{
				this.sharedService.hideSpinner();
				
			});
		},err=>{
			this.sharedService.hideSpinner();

		});

		// this.addedToCartSnackbar();
	}
}
