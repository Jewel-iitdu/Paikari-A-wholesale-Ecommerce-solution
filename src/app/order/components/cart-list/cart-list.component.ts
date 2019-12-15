import { ProductService } from './../../../product/services/product.service';
import { environment } from '../../../../environments/environment';
import { Component, OnInit, HostListener } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderInformation } from '../../../config/interfaces/order.interface';
import { PaymentService } from '../../../payments/services/payment.service';

import _ from 'lodash';

@Component({
	selector: 'app-cart-list',
	templateUrl: './cart-list.component.html',
	styleUrls: [ './cart-list.component.scss' ]
})
export class CartListComponent implements OnInit {
	customerID: string;
	cartList = [];
	initialCartlist = [];
	handler: any;
	amount = 0;
	orderIDs = [];

	constructor(
		private orderService: OrderService,
		private paymentSvc: PaymentService,
		private productService: ProductService
	) {}

	ngOnInit() {
		this.setCartInformation();
		this.handler = StripeCheckout.configure({
			key: environment.stripeKey,
			// image: '/your/awesome/logo.jpg',
			locale: 'auto',
			token: (token) => {
				
				this.paymentSvc.processPayment(token, this.amount, this.orderIDs);
				this.paymentFlagCheck();
			}
		});
	}
	


	paymentFlagCheck(){
		
		let productIds=[];
		for (let i of this.cartList) {
			productIds.push(i.data.productID);
		}
		this.orderService.updatePaymentFlag(productIds);

	}
	setCartInformation() {
		this.orderService.getUserId().subscribe((res) => {
			this.customerID = res;
			this.orderService.getCartItemList(res).subscribe((list) => {
				
				this.cartList = list;
				this.amount = 0;
				this.setTotalAmount();
			});
		});
	}

	setTotalAmount() {
		this.amount = 0;
		for (let i of this.cartList) {
			this.amount += i.data.productPrice * i.data.orderQuantity;
		}
	}

	handlePayment() {
		this.handler.open({
			name: 'paikari.com',
			excerpt: 'Deposit Funds to Account',
			amount: this.amount
		});

		
	}

	@HostListener('window:popstate')
	onPopstate() {
		this.handler.close();
	}

	decreaseItem(item, index) {
		let x = this.cartList[index].data.orderQuantity;

		this.productService.getProductByProductId(this.cartList[index].data.productID).subscribe((res) => {
			if (x > res.data.productquantity) {
				

				this.cartList[index].data.orderQuantity -= 1;
				this.setTotalAmount();
			}
		});
	}

	increaseItem(item, index) {
		this.cartList[index].data.orderQuantity += 1;
		this.setTotalAmount();
	}

	checkout() {
		this.orderIDs=[];
		for (let i of this.cartList) {
			
			this.orderService.updateCartQuantity(i.data.orderQuantity, i.id);
			this.orderIDs.push(i.data.productID);
		}
		this.handlePayment();
	}
}
