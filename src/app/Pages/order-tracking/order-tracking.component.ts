import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  orderNumber: any
  currentDate: string;
  constructor( public router: Router, public dialogRef: MatDialogRef<OrderTrackingComponent>) {
    this.currentDate = new Date().toLocaleDateString();
  }
  ngOnInit(){
    this.orderNumber = localStorage.getItem('responseOrder')
    let index = this.orderNumber.indexOf('is')
    this.orderNumber = this.orderNumber.substring(index +2)

  }
  Close(){
    this.router.navigate(['/category'])
    this.dialogRef.close()
  }
}
