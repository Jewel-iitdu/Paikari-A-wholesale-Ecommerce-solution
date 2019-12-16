import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-complaint-box',
	templateUrl: './complaint-box.component.html',
	styleUrls: [ './complaint-box.component.scss' ]
})
export class ComplaintBoxComponent implements OnInit {
	complainData;
	userData;

	shownComplaints = [];
	constructor(private adminService: AdminService) {}

	ngOnInit() {
		this.setNecessaryData();
	}

	makeComplaints() {
		let customerName, SupplierName;
		for (let i of this.complainData) {
			customerName = '';
			SupplierName = '';

			if (i.data.complaint) {
				for (let j of this.userData) {
					if (i.data.customerID == j.id) {
						customerName = j.data.name;
					}
					if (i.data.supplierID == j.id) {
						SupplierName = j.data.name;
					}
				}
				this.shownComplaints.push({
					customerName: customerName,
					complaintText: i.data.complaintText,
					supplierName: SupplierName
				});
			}
		}
	}
	setNecessaryData() {
		this.adminService.getUserList().pipe(first()).subscribe((res) => {
			this.userData = res;
			this.adminService.getComplainData().pipe(first()).subscribe((res2) => {
				this.complainData = res2;
				this.makeComplaints();
			});
		});
	}
}
