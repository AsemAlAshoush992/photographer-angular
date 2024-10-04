import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/font-awesome.min.css',
    '../../../assets/css/elegant-icons.css',
    '../../../assets/css/magnific-popup.css',
    '../../../assets/css/slicknav.min.css',
    '../../../assets/css/style.css',
  ]
})
export class NavComponent {

  lang: any = "en"
  constructor(private translate: TranslateService){
    this.lang = this.translate.currentLang
  }

  ChangeLang(){
    if(this.lang == "en"){
      localStorage.setItem('lang', 'ar')
    }else{
      localStorage.setItem('lang', 'en')
    }
    window.location.reload()
  }
  IsLoggedIn: string | null = '';
  ngOnInit() {
  this.IsLoggedIn = localStorage.getItem("IsLoggedIn")
  }
  
}
