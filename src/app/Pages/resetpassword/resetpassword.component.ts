import { Component } from '@angular/core';
import { MainServicesService } from 'src/app/Backend/main-services.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
constructor(public backend: MainServicesService){}
}
