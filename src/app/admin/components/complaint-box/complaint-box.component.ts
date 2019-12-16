import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaint-box',
  templateUrl: './complaint-box.component.html',
  styleUrls: ['./complaint-box.component.scss']
})
export class ComplaintBoxComponent implements OnInit {

  complainData;
  

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.setComplainData();
  }
  setComplainData() {
    this.adminService.getComplainData().subscribe(res=>{
      this.complainData = res;
    })
  }


}
