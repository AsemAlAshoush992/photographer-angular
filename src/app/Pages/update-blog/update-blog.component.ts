import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { BlogDetailsForUserDTO } from 'src/app/DTOs/Blogs/blogDetailsForUserDTO';
import { UpdateBlogDTO } from 'src/app/DTOs/Blogs/updateBlogDTO';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
  ]
})
export class UpdateBlogComponent {
  file: File | undefined;
  fileNumber: number = 0;
  editBlog: UpdateBlogDTO = new UpdateBlogDTO()
  constructor(public dialogRef: MatDialogRef<UpdateBlogComponent>, @Inject(MAT_DIALOG_DATA) public data: BlogDetailsForUserDTO, public backend: MainServicesService,
    public spinner: NgxSpinnerService, public toastr: ToastrService) { }


  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0]
      console.log(this.file)
    }
  }
  updateBlog() {

    if (this.file != undefined) {
      this.spinner.show()
      this.editBlog.id = this.data.id
      this.editBlog.article = this.data.article
      this.editBlog.title = this.data.title
      this.editBlog.attachementId = this.fileNumber
      this.backend.uploadFile(this.file).subscribe(res => {
        this.editBlog.path = res;
        this.backend.updateblog(this.editBlog).subscribe(res => {
          this.spinner.hide()
          this.toastr.success('The blog has been updated')
          this.dialogRef.close(true)
        }, err => {
          this.spinner.hide()
          this.toastr.warning('Blog update failed')
          this.dialogRef.close(false)
        })
      }, err => {
        this.spinner.hide()
      })
    } else {
      this.spinner.show()
      this.editBlog.id = this.data.id
      this.editBlog.article = this.data.article
      this.editBlog.title = this.data.title
      this.backend.updateblog(this.editBlog).subscribe(res => {
        this.spinner.hide()
        this.toastr.success('The blog has been updated')
        this.dialogRef.close(true)
      }, err => {
        this.spinner.hide()
        this.toastr.warning('Blog update failed')
        this.dialogRef.close(false)
      })
    }

  }
}
