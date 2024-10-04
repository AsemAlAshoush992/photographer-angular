
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { CategoriesInfoDTO } from 'src/app/DTOs/categoriesInfoDTO';
import { PhotosAndVideosInfoDTO } from 'src/app/DTOs/photosAndVideosInfoDTO';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css',
  ]
})
export class MainComponent {
    photos:PhotosAndVideosInfoDTO[] = [];
    videos:PhotosAndVideosInfoDTO[] = [];
    categories: CategoriesInfoDTO[]= [];
    groupedCategories: CategoriesInfoDTO[][] = []; 
    constructor(public backend: MainServicesService, public load: NgxSpinnerService, public toastr: ToastrService){ }


  
    ngOnInit()
    {
      this.load.show()
      this.backend.getPublicGalleryPhotos().subscribe(res => {
        this.photos = res
        this.load.hide()
      }, err =>{
        this.load.hide()
        this.toastr.warning('The Photos not found')
      })
  
      this.backend.getPublicGalleryVideos().subscribe(res => {
        this.load.hide()
        this.videos = res
      }, err =>{
        this.load.hide()
        this.toastr.warning('The videos not found')
      })

      this.backend.getCategories().subscribe(res => {
        this.load.hide()
        this.categories = res;
        this.groupCategories(); // تجميع الفئات بعد تحميلها
      }, err => {
        this.load.hide()
        this.toastr.warning('The Categories not found')
      });
      
    }
    groupCategories() {
      const chunkSize = 3; // عدد الفئات في كل مجموعة
      for (let i = 0; i < this.categories.length; i += chunkSize) {
        this.groupedCategories.push(this.categories.slice(i, i + chunkSize));
      }
    }
    
    getChunkedCategories(chunkSize: number) {
      const chunks = [];
      for (let i = 0; i < this.categories.length; i += chunkSize) {
        chunks.push(this.categories.slice(i, i + chunkSize));
      }
      return chunks;
    }
}
