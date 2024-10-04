import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/DTOs/confirmDialog/confirmDialog';
import { UpdateUserDTO } from 'src/app/DTOs/Profile/updateUserDTO';
import { ConfirmDialogComponent } from 'src/app/SharedComponent/confirm-dialog/confirm-dialog.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { UserInfoDTO } from 'src/app/DTOs/Profile/userInfoDTO';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',
    '../../../assets/UserUI/css/sb-admin-2.min.css',
    '../../../assets/UserUI/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ProfileComponent {
  userInformation: UserInfoDTO | undefined;
  constructor(public dialog: MatDialog, public backend: MainServicesService, public spinner: NgxSpinnerService,
    public toastr: ToastrService, public router: Router) { }

  DeleteProfile() {
    let info = new ConfirmDialogData('Are you sure ?', 'Are you want to delete this Profile ?')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info

    });
    dialogres.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show()
        this.backend.deleteUserAccount().subscribe(res => {
          this.spinner.hide()
          this.toastr.success('The user account has been deleted')
          this.router.navigate([''])

          this.ngOnInit()
        }, err => {
          this.spinner.hide()
          this.toastr.success('Faild to delete the user account')
        })
      } else {

      }
    });
  }


  UpdateProfile(item: UserInfoDTO | undefined) {
    const dialogres = this.dialog.open(UpdateProfileComponent, {
      width: '800px',
      data: item
    });


    dialogres.afterClosed().subscribe(result => {
      if (result) {
        window.location.reload();
      } else {

      }
    });
  }


  ngOnInit() {
    this.spinner.show()
    this.backend.getUserInformation().subscribe(
      (res: UserInfoDTO) => { // Directly handle the object
        this.spinner.hide()
        this.userInformation = res;
      },
      err => {
        this.spinner.hide()
        this.toastr.warning('The UserInformation not found')
      }
    );
  }



}
