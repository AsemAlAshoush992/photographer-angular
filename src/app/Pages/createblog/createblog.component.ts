import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { CreateBlogDTO } from 'src/app/DTOs/Blogs/createBlogDTO';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
  ]
})
export class CreateblogComponent {

  fileExists: boolean = false;
  fileTouched: boolean = false;
  files: File[] = [];
  createBlogobj: CreateBlogDTO = new CreateBlogDTO()
  @ViewChild('blogForm') blogForm!: NgForm;
  constructor(public backend: MainServicesService,
    public spinner: NgxSpinnerService, public toastr: ToastrService, public dialogRef: MatDialogRef<CreateblogComponent>) { }


  onFileSelected(event: any) {
    this.fileTouched = true;
    if (event.target.files && event.target.files.length > 0) {
      this.files = Array.from(event.target.files); // حفظ الملفات المختارة في المصفوفة
      this.fileExists = true;
    } else {
      this.fileExists = false;
    }
  }
  createnewBlog() {
    this.spinner.show()
    if (this.files.length > 0) {
      this.spinner.show()
      this.backend.uploadFiles(this.files).subscribe(res1 => {
        this.createBlogobj.filePath = res1;
        this.backend.createBlog(this.createBlogobj).subscribe(res => {
          this.spinner.hide()
          this.dialogRef.close(true)
          this.toastr.success('The blog has been created')
        }, err => {
          this.spinner.hide()
          this.dialogRef.close(false)
          this.toastr.warning('Blog create failed')
        })
      }, err => {
        this.spinner.hide()
        this.dialogRef.close(false)
      })
    }
    else {
      this.spinner.hide()
      this.toastr.warning('The image not found')
    }
  }

}
