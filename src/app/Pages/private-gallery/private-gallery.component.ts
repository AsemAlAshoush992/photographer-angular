import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { PrivateGalleryDetailsForClientDTO } from 'src/app/DTOs/Gallery/privateGalleryDetailsForClientDTO';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/SharedComponent/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from 'src/app/DTOs/confirmDialog/confirmDialog';
import { UpdateGalleryComponent } from '../update-gallery/update-gallery.component';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { CreateGalleryComponent } from '../create-gallery/create-gallery.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-private-gallery',
  templateUrl: './private-gallery.component.html',
  styleUrls: ['./private-gallery.component.css',
     '../../../assets/UserUI/css/sb-admin-2.min.css',
    '../../../assets/UserUI/vendor/fontawesome-free/css/all.min.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css'
  ]
})
export class PrivateGalleryComponent {
  galleryArray: PrivateGalleryDetailsForClientDTO[] = [];
   
  file: string | undefined;
  privateGallery : PrivateGalleryDetailsForClientDTO [] = []
  privateGalleryImages : PrivateGalleryDetailsForClientDTO [] = []
  privateGalleryVideos : PrivateGalleryDetailsForClientDTO [] = []
  displayedColumns: string[] = ['id', 'path', 'fileName', 'fileType', 'actions'];
  dataSource: MatTableDataSource<PrivateGalleryDetailsForClientDTO>;

 

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, public backend: MainServicesService, public spinner: NgxSpinnerService,
    public toastr: ToastrService)
  {
    this.dataSource = new MatTableDataSource
    this.sort = new MatSort
  }

  ngOnInit(){
    this.spinner.show()
    this.backend.getAllPrivateGallerywithoutOredrsByUser().subscribe(res => {
      this.spinner.hide()
      this.galleryArray = res
      this.privateGalleryImages = res.filter(m => m.fileType == 'Image')
      this.privateGalleryVideos = res.filter(m => m.fileType == 'Video')
      this.dataSource.data = this.galleryArray
    }, err => {
      this.spinner.hide()
      this.toastr.warning('The photos not found')
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  UpdateGallry(item: PrivateGalleryDetailsForClientDTO){
    const dialogres1 = this.dialog.open(UpdateGalleryComponent, {
      width: '600px',
      height: '75vh',
      data: item
    });
    dialogres1.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit()
      }else{
      }
    });
  }


  DeleteGallry(galleryId : number){
    let info = new ConfirmDialogData('Are you sure ?', 'Are you want to delete this File ?')
    const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info
    });

    dialogres.afterClosed().subscribe(result => {
      if(result){
        this.spinner.show()
        this.backend.deletePrivateGallery(galleryId).subscribe(res =>{
        this.spinner.hide()
        this.toastr.success('The file has been deleted')
        this.ngOnInit()
        }, err => {
          this.spinner.hide()
          this.toastr.success('Faild to delete the file')
        })
      }else{
        
      }
    });
  }
 
  CreateGallery()
  {
    const dialogres2 = this.dialog.open(CreateGalleryComponent, {
      width: '600px',
      height: '75vh'
    });

    dialogres2.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit()
      }else{
      }
    });

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
