import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { UserInfoDTO } from 'src/app/DTOs/Profile/userInfoDTO';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css',
    '../../../assets/UserUI/css/sb-admin-2.min.css',
    '../../../assets/UserUI/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class NavUserComponent {

  userInformation: UserInfoDTO | undefined;
  constructor(public backend: MainServicesService, private notification:ToastrService, private router:Router, private load: NgxSpinnerService){}

  ngOnInit(){
    this.backend.getUserInformation().subscribe(
      (res: UserInfoDTO) => { // Directly handle the object
          this.userInformation = res;
          console.log(this.userInformation)
      },
      err => {
        
      }
    );
  }


  Logout() {
    this.load.show()
    this.backend.logout().subscribe(
      res => {
        this.notification.success('Logout success')
        localStorage.removeItem('token');
        localStorage.setItem("IsLoggedIn", "")
        // إعادة التوجيه إلى صفحة تسجيل الدخول أو الصفحة الرئيسية
        this.router.navigate(['']);
        this.load.hide()
      },
      err => {
        this.notification.warning('Logout failed')
      }
    );
  }
}
