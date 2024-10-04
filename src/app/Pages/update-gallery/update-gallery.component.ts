import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { PrivateGalleryDetailsForClientDTO } from 'src/app/DTOs/Gallery/privateGalleryDetailsForClientDTO';
import { UpdatePrivateGalleryDTO } from 'src/app/DTOs/Gallery/updatePrivateGalleryDTO';

@Component({
  selector: 'app-update-gallery',
  templateUrl: './update-gallery.component.html',
  styleUrls: ['./update-gallery.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
  ]
})
export class UpdateGalleryComponent {
  file: File | undefined;
  editFile: UpdatePrivateGalleryDTO = new UpdatePrivateGalleryDTO()
  constructor(public dialogRef: MatDialogRef<UpdateGalleryComponent>, @Inject(MAT_DIALOG_DATA) public data: PrivateGalleryDetailsForClientDTO, public backend: MainServicesService,
  public spinner: NgxSpinnerService, public toastr: ToastrService) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
    }
  }  

  updateFile(){
    this.spinner.show()
    if (this.file == undefined) {
      this.spinner.hide()
      this.dialogRef.close()
      return;
    }else{
      this.backend.uploadFile(this.file).subscribe(res => {
        this.editFile.path = res;
        this.editFile.id = this.data.id
        this.backend.updatePrivateGallery(this.editFile).subscribe(res => {
          this.spinner.hide()
          this.toastr.success('The file has been updated')
          this.dialogRef.close(true)
        }, err => {
          this.spinner.hide()
          this.toastr.warning('File update failed')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    }
  }

}
