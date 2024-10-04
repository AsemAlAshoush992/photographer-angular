import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { LoginDTO } from 'src/app/DTOs/loginDTO';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css',
    '../../../assets/Login/css/style.css',
  ]
})
export class SigninComponent {
  locale: string | null=   localStorage.getItem('lang')
  @ViewChild('loginForm') loginForm!: NgForm;
  passwordFieldType: string = 'password';
  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  constructor(private api: MainServicesService, private notification: ToastrService, private router: Router, private load: NgxSpinnerService) { }
  obj: LoginDTO = new LoginDTO()
  Login() {
    if (this.loginForm.invalid) {
      // لا تقم بإرسال البيانات إذا كان هناك حقول غير صحيحة
      this.notification.warning('Please fill out all required fields correctly.');
      return;
    }
    this.load.show()
    this.api.login(this.obj).subscribe(res => {
      localStorage.setItem("token", res)
      localStorage.setItem("IsLoggedIn", "true")
      this.load.hide()
      if (localStorage.getItem('NewOrder') == 'true') {
        this.router.navigate(['/create-order'])
        localStorage.removeItem('NewOrder')
      } else {
        this.notification.success('Login success')
        this.router.navigate(['/profile'])
      }

    }, err => {
      this.notification.warning('Login failed you\'re not client')
      this.load.hide()
    })
  }

}
