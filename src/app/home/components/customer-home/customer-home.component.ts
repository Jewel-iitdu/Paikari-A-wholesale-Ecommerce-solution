import { CatergoryService } from './../../../product/services/catergory.service';
import { SecurityService } from 'src/app/core/security-service/security.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import { ProductService } from './../../../product/services/product.service';
import { OrderInformation } from './../../../config/interfaces/order.interface';
import { OrderService } from './../../../order/services/order.service';
import { ProductInformation } from './../../../config/interfaces/product.interface';
import { CustomerHomeService } from './../../services/customer-home.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
	selector: 'app-customer-home',
	templateUrl: './customer-home.component.html',
	styleUrls: [ './customer-home.component.scss' ]
})
export class CustomerHomeComponent implements OnInit {
	productData: ProductInformation[] = [];
	filterData: ProductInformation[] = [];
	categoryData=[];
	selectedCategory;
	firestoreData: Observable<any[]>;
	orderInfo: OrderInformation;
	singleProduct: ProductInformation;
	userID: string;
	role;
	constructor(
		private homeService: CustomerHomeService,
		private orderService: OrderService,
		private productService: ProductService,
		private utility: UtilityService,
		private sharedService: SharedService,
		private router: Router,
		private security: SecurityService,
		private categoryService:CatergoryService
	) {}

	ngOnInit() {
		this.setUserID();
		this.setAllProducts();
		this.setAllCategory();
		this.security.getRole().subscribe(res=>{
			this.role = res;
		})
	}




	setUserID() {
		this.orderService.getUserId().subscribe((res) => {
			this.userID = res;
		});
	}

	setAllProducts() {
		this.homeService.getAllProducts().subscribe((list) => {
			const products = list.map((item) => {
				return {
					id: item.payload.doc.id,
					...item.payload.doc.data()
				};
			});
			this.productData = products;
			this.filterData = products;
		});
	}

	addToCart(product) {
		this.sharedService.showSpinner();

		this.singleProduct = product;
		this.orderInfo = {
			productID: this.singleProduct.id,
			orderQuantity: this.singleProduct.productquantity,
			productName:this.singleProduct.productname,
			productPrice:this.singleProduct.productprice,
			payment: false,
			date: firebase.firestore.FieldValue.serverTimestamp(),
			customerID: this.userID,
			supplierID: this.singleProduct.supplierId,
			rated: false,
			complaint:false,
			complaintText: ""
		};
		this.orderService.createOrAddCart(this.orderInfo).subscribe((res) => {
			this.sharedService.hideSpinner();
		});
		this.addedToCartSnackbar();
	}

	addedToCartSnackbar() {
		this.sharedService.openSnackBar({
			duration: 1,
			data: {
				isAccepted: true,
				message: 'Product Added to cart'
			},
			panelClass: [ 'recovery-snackbar' ]
		});
	}

	applyFilter(value) {
		value = String(value);
		let x = this.utility.checkIfExists(value, this.filterData);
		this.productData = x;
	}
	singleProductView(id){
		this.router.navigateByUrl(`/product/product-list/product/${id}`)
	}
	onCategorySelection(){
		console.log(this.selectedCategory);
		if(this.selectedCategory){
			this.applyFilter(this.selectedCategory);
		}
		else{
			this.applyFilter('');

		}
	}

	setAllCategory(){
		this.categoryData=this.categoryService.getCategories();

	}
	
}
