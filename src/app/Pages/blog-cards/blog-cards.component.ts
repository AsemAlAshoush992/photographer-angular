import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { BlogsCardsDTO } from 'src/app/DTOs/blogsCardsDTO';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.component.html',
  styleUrls: ['./blog-cards.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css',
  ]
})
export class BlogCardsComponent {
locale: string | null=   localStorage.getItem('lang')
 blogs:BlogsCardsDTO[] = [];
 p: number = 1; // رقم الصفحة الحالية
  constructor(public backend: MainServicesService, public rouer: Router, public load: NgxSpinnerService){ }

  ngOnInit()
  {
    this.load.show()
    this.backend.getBlogsCards().subscribe(res => {
      this.load.hide()
      this.blogs = res
    }, err =>{
      this.load.hide()
    })
  }

  toBlogDetails(id: number | undefined){
    if(id != undefined) this.rouer.navigate(['/blog-details',id])
  }
}
