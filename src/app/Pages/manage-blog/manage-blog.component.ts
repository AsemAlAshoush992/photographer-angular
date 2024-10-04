import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BlogDetailsForUserDTO } from 'src/app/DTOs/Blogs/blogDetailsForUserDTO';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/SharedComponent/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from 'src/app/DTOs/confirmDialog/confirmDialog';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { CreateblogComponent } from '../createblog/createblog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.css',
    '../../../assets/UserUI/css/sb-admin-2.min.css',
    '../../../assets/UserUI/vendor/fontawesome-free/css/all.min.css'
  ]
})
export class ManageBlogComponent {

  blogsArray: BlogDetailsForUserDTO[] = [];



  displayedColumns: string[] = ['id', 'title', 'article', 'blogDate', 'authorName', 'status', 'fileNumbers', 'filePaths',  'actions'];
  dataSource: MatTableDataSource<BlogDetailsForUserDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog, public backend: MainServicesService, public spinner: NgxSpinnerService,
    public toastr: ToastrService, public router: Router) {
    this.dataSource = new MatTableDataSource
    this.sort = new MatSort
  }

  ngOnInit() {
    this.spinner.show()
    this.backend.getAllBlogsForClient().subscribe(res => {
      this.spinner.hide()
      this.blogsArray = res
      this.dataSource.data = this.blogsArray
      console.log(this.dataSource.data)
    }, err => {
      this.spinner.hide()
      this.toastr.warning('The Blogs not found')
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

  UpdateBlog(item: BlogDetailsForUserDTO) {
    const dialogres2= this.dialog.open(UpdateBlogComponent, {
      width: '850px',
      height: '95vh',
      data: item
    });

    dialogres2.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit()
      }else{
        
      }
    });
  }


  DeleteBlog(blogId : number) {
    let info = new ConfirmDialogData('Are you sure ?', 'Are you want to delete this Blog ?')
     const dialogres = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: info

    });

    dialogres.afterClosed().subscribe(result => {
      if(result){
        this.spinner.show()
        this.backend.deleteBlog(blogId).subscribe(res =>{
        this.spinner.hide()
        this.toastr.success('The blog has been deleted')
        this.ngOnInit()
        }, err => {
          this.spinner.hide()
          this.toastr.warning('Faild to delete the blog')
        })
      }else{
        
      }
    });
  }
   
  

  CreateBlog() {
    const dialogres1= this.dialog.open(CreateblogComponent, {
      width: '850px',
      height: '95vh'
    });

    dialogres1.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit()
      }else{
        
      }
    });
  }
}
