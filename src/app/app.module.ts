import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './Pages/main/main.component';
import { BlogDetailComponent } from './Pages/blog-detail/blog-detail.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { ResetpasswordComponent } from './Pages/resetpassword/resetpassword.component';
import { CreateblogComponent } from './Pages/createblog/createblog.component';
import { ErrorComponent } from './Pages/error/error.component';
import { NavComponent } from './SharedComponent/nav/nav.component';
import { FooterComponent } from './SharedComponent/footer/footer.component';
import { AboutMeComponent } from './Pages/about-me/about-me.component';
import { ContactRequestComponent } from './Pages/contact-request/contact-request.component';
import { TechnicalSupportComponent } from './Pages/technical-support/technical-support.component';
import { ConfirmDialogComponent } from './SharedComponent/confirm-dialog/confirm-dialog.component';
import { RequestServicesComponent } from './Pages/request-services/request-services.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PublicGalleryComponent } from './Pages/public-gallery/public-gallery.component';
import { PrivateGalleryComponent } from './Pages/private-gallery/private-gallery.component';
import { BlogCardsComponent } from './Pages/blog-cards/blog-cards.component';
import { ServicesCategoriesComponent } from './Pages/services-categories/services-categories.component';
import { ServicesCardsComponent } from './Pages/services-cards/services-cards.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ManageBlogComponent } from './Pages/manage-blog/manage-blog.component';
import { NavUserComponent } from './Nav-User/nav-user/nav-user.component';
import { SidebarUserComponent } from './Nav-User/sidebar-user/sidebar-user.component';
import { FooterUserComponent } from './Nav-User/footer-user/footer-user.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GalleryOrdersComponent } from './Pages/gallery-orders/gallery-orders.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateBlogComponent } from './Pages/update-blog/update-blog.component';
import { UpdateGalleryComponent } from './Pages/update-gallery/update-gallery.component';
import { CreateGalleryComponent } from './Pages/create-gallery/create-gallery.component';
import { UpdateProfileComponent } from './Pages/update-profile/update-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateOrderComponent } from './Pages/create-order/create-order.component';
import { OrderTrackingComponent } from './Pages/order-tracking/order-tracking.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BlogDetailComponent,
    SignupComponent,
    SigninComponent,
    ResetpasswordComponent,
    CreateblogComponent,
    ErrorComponent,
    NavComponent,
    FooterComponent,
    AboutMeComponent,
    ContactRequestComponent,
    TechnicalSupportComponent,
    ConfirmDialogComponent,
    RequestServicesComponent,
    PublicGalleryComponent,
    PrivateGalleryComponent,
    BlogCardsComponent,
    ServicesCategoriesComponent,
    ServicesCardsComponent,
    ProfileComponent,
    ManageBlogComponent,
    NavUserComponent,
    SidebarUserComponent,
    FooterUserComponent,
    GalleryOrdersComponent,
    UpdateBlogComponent,
    UpdateGalleryComponent,
    CreateGalleryComponent,
    UpdateProfileComponent,
    CreateOrderComponent,
    OrderTrackingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    TranslateModule.forRoot({
      
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    NgxPaginationModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
