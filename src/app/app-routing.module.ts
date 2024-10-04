import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Pages/main/main.component';
import { ErrorComponent } from './Pages/error/error.component';
import { ContactRequestComponent } from './Pages/contact-request/contact-request.component';
import { AboutMeComponent } from './Pages/about-me/about-me.component';
import { TechnicalSupportComponent } from './Pages/technical-support/technical-support.component';
import { RequestServicesComponent } from './Pages/request-services/request-services.component';
import { CreateblogComponent } from './Pages/createblog/createblog.component';
import { BlogDetailComponent } from './Pages/blog-detail/blog-detail.component';
import { ResetpasswordComponent } from './Pages/resetpassword/resetpassword.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { PublicGalleryComponent } from './Pages/public-gallery/public-gallery.component';
import { PrivateGalleryComponent } from './Pages/private-gallery/private-gallery.component';
import { BlogCardsComponent } from './Pages/blog-cards/blog-cards.component';
import { ServicesCategoriesComponent } from './Pages/services-categories/services-categories.component';
import { ServicesCardsComponent } from './Pages/services-cards/services-cards.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { ManageBlogComponent } from './Pages/manage-blog/manage-blog.component';
import { GalleryOrdersComponent } from './Pages/gallery-orders/gallery-orders.component';
import { CreateGalleryComponent } from './Pages/create-gallery/create-gallery.component';
import { UpdateProfileComponent } from './Pages/update-profile/update-profile.component';
import { CreateOrderComponent } from './Pages/create-order/create-order.component';
import { OrderTrackingComponent } from './Pages/order-tracking/order-tracking.component';
import { MainGuardGuard } from './Guards/main-guard.guard';
const routes: Routes = [
  {
    path:'',//Main page
    component:MainComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'resetpassword',
    component:ResetpasswordComponent
  },
  {
    path:'blog-details/:id',
    component:BlogDetailComponent
  },
  {
    path:'create-blog',
    component:CreateblogComponent
  },
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'request-services',
    component:RequestServicesComponent
  },
  {
    path:'technical-support',
    component:TechnicalSupportComponent
  },
  {
    path:'about-me',
    component:AboutMeComponent
  },
  {
    path:'contact-request',
    component:ContactRequestComponent
  },
  {
    path:'private-gallery',
    component:PrivateGalleryComponent, canActivate: [MainGuardGuard]
  },
  {
    path:'pubic-gallery',
    component:PublicGalleryComponent
  }
  ,
  {
    path:'blog-cards',
    component:BlogCardsComponent
  },
  {
    path:'category',
    component:ServicesCategoriesComponent
  },
  {
    path:'service-cards/:id',
    component:ServicesCardsComponent
  },
  {
    path:'profile',
    component:ProfileComponent, canActivate: [MainGuardGuard]
  },
  {
    path:'manage-blog',
    component:ManageBlogComponent, canActivate: [MainGuardGuard]
  },
  {
    path:'gallery-orders',
    component:GalleryOrdersComponent, canActivate: [MainGuardGuard]
  },
  {
    path:'create-gallery',
    component:CreateGalleryComponent
  },
  {
    path:'update-profile',
    component:UpdateProfileComponent
  },
  {
    path:'create-order',
    component:CreateOrderComponent
  },
  {
    path:'order-tracking',
    component:OrderTrackingComponent
  },
  {
    path:'**',
    component:ErrorComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
