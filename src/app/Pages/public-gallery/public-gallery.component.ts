import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { PhotosAndVideosInfoDTO } from 'src/app/DTOs/photosAndVideosInfoDTO';

@Component({
  selector: 'app-public-gallery',
  templateUrl: './public-gallery.component.html',
  styleUrls: ['./public-gallery.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css',
  ],
})

export class PublicGalleryComponent {

  photos:PhotosAndVideosInfoDTO[] = [];
  videos:PhotosAndVideosInfoDTO[] = [];
  constructor(public backend: MainServicesService, public load: NgxSpinnerService, public toastr: ToastrService){ }

  ngOnInit()
  {
    this.load.show()
    this.backend.getPublicGalleryPhotos().subscribe(res => {
      this.load.hide()
      this.photos = res
    }, err =>{
      this.load.hide()
      this.toastr.warning('The photos not found')
    })

    this.backend.getPublicGalleryVideos().subscribe(res => {
      this.load.hide()
      this.videos = res
    }, err =>{
      this.load.hide()
      this.toastr.warning('The videos not found')
    })
  }

}
