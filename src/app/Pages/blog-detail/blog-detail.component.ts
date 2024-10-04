import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { BlogDetailsForUserDTO } from 'src/app/DTOs/Blogs/blogDetailsForUserDTO';
import { CreateCommentDTO } from 'src/app/DTOs/comment/createCommentDTO';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css'
  ]
})
export class BlogDetailComponent {
  locale: string | null=   localStorage.getItem('lang')
  @ViewChild('commentForm') commentForm!: NgForm;

  createComment : CreateCommentDTO = new CreateCommentDTO()
  blogId: number = 0
  blogDetails: BlogDetailsForUserDTO = new BlogDetailsForUserDTO
  constructor(public backend: MainServicesService, public load: NgxSpinnerService, public toastr: ToastrService
    , public router: Router, public route: ActivatedRoute
  ) { }

  
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let paramId = params.get('id')
      if (paramId != null)
        this.blogId = parseInt(paramId)
    });
    this.load.show()
    this.backend.getBlogDetailsByID(this.blogId).subscribe(res => {
      this.load.hide()
      this.blogDetails = res
      this.createComment.blogId = this.blogDetails.id
    }, err => {
      this.load.hide()
      this.toastr.warning('faild to load blog details')
      this.router.navigate(['/blog-cards'])
    })
  }
  CreateComment(){
    if (this.commentForm.invalid) {
      // لا تقم بإرسال البيانات إذا كان هناك حقول غير صحيحة
      this.toastr.warning('Please fill out all required fields correctly.');
      return;
    }
    this.load.show()
    this.backend.CreateComment(this.createComment).subscribe(res => {
      this.load.hide()
      this.toastr.success('New comment has been created')
      this.ngOnInit()
      this.commentForm.onReset()
    }, err => {
      this.load.hide()
      this.toastr.error('The comment has been faild')
    })
  }
}
