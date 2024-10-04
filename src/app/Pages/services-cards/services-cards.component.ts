import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainServicesService } from 'src/app/Backend/main-services.service';
import { ServiceInfoDTO } from 'src/app/DTOs/Services/serviceInfoDTO';

@Component({
  selector: 'app-services-cards',
  templateUrl: './services-cards.component.html',
  styleUrls: ['./services-cards.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css'
  ]
})
export class ServicesCardsComponent {
  locale: string | null=   localStorage.getItem('lang')
  services: ServiceInfoDTO[] = []
  isNewOrder: boolean = false;
  categoryId: number = 0
  constructor(public backend: MainServicesService, public load: NgxSpinnerService, public toastr: ToastrService
    , public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let paramId = params.get('id')
      if (paramId != null)
        this.categoryId = parseInt(paramId)
    });
    this.load.show()
    this.backend.getServices(this.categoryId).subscribe(res => {
      this.load.hide()
      this.services = res
    }, err => {
      this.load.hide()
      this.toastr.error('faild to load service')
      this.router.navigate(['/category'])
    });
  }

  onOrderNow(service : any){
    this.isNewOrder = true;
    localStorage.setItem('NewOrder', this.isNewOrder.toString() )
    if(!this.backend.isLoggedIn()){
      this.backend.redirectToLogin();
      return;
    }
    if(service != undefined){
      localStorage.setItem('serviceCard', JSON.stringify(service))
    }
    this.router.navigate(['/create-order'])
  }
}
