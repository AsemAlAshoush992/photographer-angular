import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { CreatePrivateGalleryDTO } from 'src/app/DTOs/Gallery/createPrivateGalleryDTO';

@Component({
  selector: 'app-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['./create-gallery.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
  ]
})
export class CreateGalleryComponent {
  file: File | undefined;
  constructor(public backend: MainServicesService, public dialogRef: MatDialogRef<CreateGalleryComponent>,
    private notification: ToastrService, public load: NgxSpinnerService
  ) { }
  fileName: CreatePrivateGalleryDTO = new CreatePrivateGalleryDTO

  
  onFileSelected(event: any){
    if(event.target.files && event.target.files[0]){
      this.file = event.target.files[0]
      console.log(this.file)
    }
  }
  CreatePrivateGallery() {
    if(this.file == undefined){

    }else{
      this.load.show()
      this.backend.uploadFile(this.file).subscribe(res => {
        this.fileName.path = res;
        this.load.hide()
        this.backend.createPrivateGallery(this.fileName).subscribe(res => {
          this.load.hide()
          this.notification.success('The file has been created')
          this.dialogRef.close(true)
        }, error => {
          this.load.show()
          this.notification.warning(' file create faild')
          this.dialogRef.close(false)
        })
      }, error => {
        return;
      });
    } 

  }
}
