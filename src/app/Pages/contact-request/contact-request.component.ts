import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { ContactRequestDTO } from 'src/app/DTOs/contactRequestDTO';

@Component({
  selector: 'app-contact-request',
  templateUrl: './contact-request.component.html',
  styleUrls: ['./contact-request.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css',
  ]
})
export class ContactRequestComponent {
  locale: string | null=   localStorage.getItem('lang')
  @ViewChild('contactForm') contactForm!: NgForm;
  constructor(private api: MainServicesService, private notification: ToastrService, private load: NgxSpinnerService
  ) { }

  contactObj: ContactRequestDTO = new ContactRequestDTO()
  Contact() {
    this.load.show()
    if (this.contactForm.invalid) {
      // لا تقم بإرسال البيانات إذا كان هناك حقول غير صحيحة
      this.notification.warning('Please fill out all required fields correctly.');
      return;
    }
    this.api.contact(this.contactObj).subscribe(res => {
      this.load.hide()
      this.notification.success('New Contact Request Has Been Sent')
      this.contactForm.reset();
    }, err => {
      this.load.hide()
      this.notification.warning('New Contact Request Has Been Failed')
    })
  }

}
