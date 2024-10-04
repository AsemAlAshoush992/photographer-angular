import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { TechnicalSupportDTO } from 'src/app/DTOs/TechnicalSupport/technicalSupportDTO';

@Component({
  selector: 'app-technical-support',
  templateUrl: './technical-support.component.html',
  styleUrls: ['./technical-support.component.css',]
})
export class TechnicalSupportComponent {
  @ViewChild('technicalForm') technicalForm!: NgForm;
 constructor(public backend: MainServicesService, public load: NgxSpinnerService, public notification : ToastrService,
  public router: Router){}

 technicalSupport : TechnicalSupportDTO = new TechnicalSupportDTO ()

 SendTechnicalSupport(){
  if (this.technicalForm.invalid) {
    // لا تقم بإرسال البيانات إذا كان هناك حقول غير صحيحة
    this.notification.warning('Please fill out all required fields correctly.');
    return;
  }
  this.load.show()
  this.backend.sendTechnicalSupport(this.technicalSupport).subscribe(res =>{
    this.notification.success('The request has been sent successfully.')
    this.load.hide()
    this.technicalForm.reset();
    this.router.navigate(['/gallery-orders'])
  }, err =>{
    this.notification.warning('The request has been sent failed.')
    this.load.hide()
  })
 }
}
