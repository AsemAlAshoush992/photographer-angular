import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { CategoriesInfoDTO } from 'src/app/DTOs/categoriesInfoDTO';

@Component({
  selector: 'app-services-categories',
  templateUrl: './services-categories.component.html',
  styleUrls: ['./services-categories.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css',
  ]
})
export class ServicesCategoriesComponent {
  locale: string | null=   localStorage.getItem('lang')
  num: number = 1
  categories: CategoriesInfoDTO[]= [];
  constructor(public backend: MainServicesService, public router: Router, public load: NgxSpinnerService,
    public toastr : ToastrService){ }

  ngOnInit()
  {
    this.load.show()
    this.backend.getCategories().subscribe(res => {
      this.load.hide()
      this.categories = res
    }, err =>{
      this.load.hide()
      this.toastr.warning('Faild to load the categories')
    })

  }

  toServiceDetails(id: number | undefined){
    if(id != undefined) this.router.navigate(['/service-cards',id])
    }
}
