import { Component } from '@angular/core';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { PrivateGalleryDetailsForClientDTO } from 'src/app/DTOs/Gallery/privateGalleryDetailsForClientDTO';
import { CreateOrderComponent } from '../create-order/create-order.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { PrivateGalleryOrderDetails } from 'src/app/DTOs/Gallery/privateGalleryOrderDetails';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery-orders',
  templateUrl: './gallery-orders.component.html',
  styleUrls: ['./gallery-orders.component.css',
    '../../../assets/UserUI/css/sb-admin-2.min.css',
    '../../../assets/UserUI/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css',
  ]
})
export class GalleryOrdersComponent {

  file: string | undefined;

  privateGallery : PrivateGalleryOrderDetails [] = []
  privateGalleryVideos : PrivateGalleryOrderDetails [] = []
 constructor(public dialog: MatDialog, public backend: MainServicesService, public spinner: NgxSpinnerService, public toastr: ToastrService){}
  ngOnInit(){
    this.spinner.show()
    this.backend.getAllPrivateGalleryByUser().subscribe(res => { 
      this.spinner.hide()
        this.privateGallery = res
      },
      err => {
        this.spinner.hide()
        this.toastr.warning('the images of gallery not found')
      }
    );

    this.backend.getAllPrivateGalleryVideosByUser().subscribe(res => { 
        this.privateGalleryVideos = res
        this.spinner.hide()
      },
      err => {
        this.spinner.hide()
        this.toastr.warning('the videos of gallery not found')
      }
    );

  }


  DownloadImage(item: string | undefined) {
    this.spinner.show()
    if (typeof item === 'string') {
      const indexOfSlash = item.indexOf('s/');
      this.file = item.substring(indexOfSlash + 2);
    }
    this.backend.DownloadFile(this.file).subscribe(res => {
      this.spinner.hide()
      this.toastr.success('The image Has Been Downloaded')
      const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'image.jpg';  // قم بتغيير الاسم والامتداد حسب الملف الخاص بك
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }, err => {
      this.spinner.hide()
      this.toastr.warning('download Has Been Failed')
    })
  }


  DownloadVideo(item: string | undefined) {
    this.spinner.show()
    if (typeof item === 'string') {
      const indexOfSlash = item.indexOf('s/');
      this.file = item.substring(indexOfSlash + 2);
    }
    this.backend.DownloadFile(this.file).subscribe(res => {
      this.spinner.hide()
      this.toastr.success('The video Has Been Downloaded')
      const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';  // قم بتغيير الاسم والامتداد حسب الملف الخاص بك
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }, err => {
      this.spinner.hide()
      this.toastr.warning('download Has Been Failed')
    })
  }

}
