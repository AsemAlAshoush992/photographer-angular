import { Component } from '@angular/core';
import { MainServicesService } from 'src/app/Backend/main-services.service';

@Component({
  selector: 'app-request-services',
  templateUrl: './request-services.component.html',
  styleUrls: ['./request-services.component.css']
})
export class RequestServicesComponent {
  constructor(public backend: MainServicesService){}
}
