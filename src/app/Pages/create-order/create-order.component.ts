import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { CreateOrderDTO } from 'src/app/DTOs/Orders/createOrderDTO';
import { OrderTrackingComponent } from '../order-tracking/order-tracking.component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {
  serviceObj: any = {}
  selectedPaymentMethod: string = '';
  orderSend: CreateOrderDTO = new CreateOrderDTO
  constructor(public backend: MainServicesService, public spinner: NgxSpinnerService, public toastr: ToastrService,
    public router: Router, public dialog: MatDialog){}


  ngOnInit() {
    // Retrieve and parse the data from localStorage
    const storedService = localStorage.getItem('serviceCard');
    if (storedService) {
      this.serviceObj = JSON.parse(storedService);
    } else {
      
    }
  }

  onPaymentMethodChange(event: any){
    if(event.target.value){
      this.selectedPaymentMethod = event.target.value;
    }
  }

  onConfirmOrder(){
    this.orderSend.paymentMethod = this.selectedPaymentMethod
    this.orderSend.serviceName = this.serviceObj.name
    this.spinner.show()
    this.backend.sendNewOreder(this.orderSend).subscribe(res => {
      localStorage.setItem('responseOrder', res ) 
      this.spinner.hide()
      this.toastr.success("New Order Has Been sent")
      this.dialog.open(OrderTrackingComponent, {
        width: '800px',
        height: '100vh'
      });
    }, err =>{
      this.spinner.hide()
      this.toastr.warning("Sending request failed")
    })
  }
}
