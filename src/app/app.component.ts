import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhotographerBlogManagementWebsite';
  lang: any
  constructor( private router: Router, private translate: TranslateService)
  {
    this.translate.setDefaultLang('en')
    this.lang = localStorage.getItem('lang')
    this.translate.addLangs(['ar', 'en']);
    this.translate.use(this.lang);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    
  }
}
