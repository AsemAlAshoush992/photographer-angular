import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { RegisterDTO } from 'src/app/DTOs/registerDTO';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  locale: string | null=   localStorage.getItem('lang')
  file: File | undefined;
  @ViewChild('registerForm') registerForm!: NgForm;
  constructor(private api: MainServicesService, private notification: ToastrService, public load: NgxSpinnerService
    ,private router: Router
  ) { }
  registerObj: RegisterDTO = new RegisterDTO()

  passwordFieldType: string = 'password';

  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onFileSelected(event: any){
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0]
    }
  }
 
  Register() {
    if(this.file == undefined){
      this.registerObj.imagePath='';
    }else{
      this.load.show()
      this.api.uploadFile(this.file).subscribe(res => {
        this.load.hide()
        this.registerObj.imagePath = res
        if (this.registerForm.invalid) {
          this.notification.warning('Please fill out all required fields correctly.');
          return;
        }
        this.api.register(this.registerObj).subscribe(res => {
          this.load.hide()
          this.notification.success('New Account Has Been Created')
          this.router.navigate(['/signin'])
        }, err => {
          this.load.hide()
          this.notification.warning('New Account Has Been Failed')
          
        })

      }, err => {
        this.load.hide()
        return;
      })
    }
  }
}
