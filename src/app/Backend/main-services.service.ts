import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogsCardsDTO } from '../DTOs/blogsCardsDTO';
import { PhotosAndVideosInfoDTO } from '../DTOs/photosAndVideosInfoDTO';
import { CategoriesInfoDTO } from '../DTOs/categoriesInfoDTO';
import { LoginDTO } from '../DTOs/loginDTO';
import { RegisterDTO } from '../DTOs/registerDTO';
import { ContactRequestDTO } from '../DTOs/contactRequestDTO';
import { UserInfoDTO } from '../DTOs/Profile/userInfoDTO';
import { PrivateGalleryDetailsForClientDTO } from '../DTOs/Gallery/privateGalleryDetailsForClientDTO';
import { UpdateUserDTO } from '../DTOs/Profile/updateUserDTO';
import { UpdatePrivateGalleryDTO } from '../DTOs/Gallery/updatePrivateGalleryDTO';
import { CreatePrivateGalleryDTO } from '../DTOs/Gallery/createPrivateGalleryDTO';
import { UpdateBlogDTO } from '../DTOs/Blogs/updateBlogDTO';
import { CreateBlogDTO } from '../DTOs/Blogs/createBlogDTO';
import { TechnicalSupportDTO } from '../DTOs/TechnicalSupport/technicalSupportDTO';
import { CancelOrderDTO } from '../DTOs/Orders/cancelOrderDTO';
import { CreateOrderDTO } from '../DTOs/Orders/createOrderDTO';
import { BlogDetailsForUserDTO } from '../DTOs/Blogs/blogDetailsForUserDTO';
import { CreateCommentDTO } from '../DTOs/comment/createCommentDTO';
import { PrivateGalleryOrderDetails } from '../DTOs/Gallery/privateGalleryOrderDetails';
import { ServiceInfoDTO } from '../DTOs/Services/serviceInfoDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainServicesService {
  //services will contains of many function to call many endpoint
  private baseURL: string = 'https://localhost:44358';
  private file: File | null = null;
  private userID: number | undefined;
  constructor(private http: HttpClient,private router: Router) { }

  //build function in services to hit API
  getBlogsCards(): Observable<BlogsCardsDTO[]> {
    return this.http.get<BlogsCardsDTO[]>(`${this.baseURL}/api/Guest/GetAllBlogCards`)
  }
  getPublicGalleryPhotos(): Observable<PhotosAndVideosInfoDTO[]> {
    return this.http.get<PhotosAndVideosInfoDTO[]>(`${this.baseURL}/api/Guest/GetAllPhotosForPublicGallery`)
  }

  getPublicGalleryVideos(): Observable<PhotosAndVideosInfoDTO[]> {
    return this.http.get<PhotosAndVideosInfoDTO[]>(`${this.baseURL}/api/Guest/GetAllVideosForPublicGallery`)
  }
  getCategories(): Observable<CategoriesInfoDTO[]> {
    return this.http.get<CategoriesInfoDTO[]>(`${this.baseURL}/api/Guest/GetAllCategories`)
  }

  getServices(id : number): Observable<ServiceInfoDTO[]> {
    return this.http.get<ServiceInfoDTO[]>(`${this.baseURL}/api/Guest/GetAllServicesByCategoryId/${id}`)
  }

  login(input: LoginDTO) {
    return this.http.put(`${this.baseURL}/api/Guest/LoginUserAccount`, input, {
      responseType: 'text'
    })
  }

  register(input: RegisterDTO) {
    return this.http.post(`${this.baseURL}/api/Guest/CreateNewClient`, input, {
      responseType: 'text'
    })
  }
  contact(input: ContactRequestDTO) {
    return this.http.post(`${this.baseURL}/api/Client/SendContactRequestForSpecifiService`, input, {
      responseType: 'text'
    })
  }


 

  getUserInformation(): Observable<UserInfoDTO> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<UserInfoDTO>(`${this.baseURL}/api/Client/GetPersonalInformationByUserID`, { headers });
  }

  getAllPrivateGalleryByUser(): Observable<PrivateGalleryOrderDetails[]> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<PrivateGalleryOrderDetails[]>(`${this.baseURL}/api/Client/GetAllPrivateGalleriesByUserId`, { headers });
  }
  getAllPrivateGalleryVideosByUser(): Observable<PrivateGalleryOrderDetails[]> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<PrivateGalleryOrderDetails[]>(`${this.baseURL}/api/Client/GetAllPrivateGalleriesVideosByUserId`, { headers });
  }


  getAllPrivateGallerywithoutOredrsByUser(): Observable<PrivateGalleryDetailsForClientDTO[]> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<PrivateGalleryDetailsForClientDTO[]>(`${this.baseURL}/api/Client/GetAllPrivateGalleriesByUserIdWithoutOrders`, { headers });
  }

  logout() {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.put(`${this.baseURL}/api/Guest/LogoutUserAcount`, {}, { headers, responseType: 'text' });
  }


  getBlogDetailsByID(id: number): Observable<BlogDetailsForUserDTO> {
    return this.http.get<BlogDetailsForUserDTO>(`${this.baseURL}/api/Guest/GetBlogDetailsForUserById/${id}`)
  }

  sendNewOreder(input: CreateOrderDTO): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.post(`${this.baseURL}/api/Client/SendOrderForSpecificService`, input,
      {headers, responseType: 'text' as 'json'})
  }


  sendTechnicalSupport(input: TechnicalSupportDTO): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.post(`${this.baseURL}/api/Client/SendTechnicalSupportRequest`, input, 
      { headers,  responseType: 'text'})
  }

  getAllBlogsForClient(): Observable<BlogDetailsForUserDTO[]> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.get<BlogDetailsForUserDTO[]>(`${this.baseURL}/api/Client/GetAllBlogsByUserID`, { headers } )
  }
  
  createBlog(input: CreateBlogDTO): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.post(`${this.baseURL}/api/Client/SendBlogFromUserForApproval`, input,
      {headers, responseType: 'text' }
    )
  }


  updateblog(input: UpdateBlogDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Client/UpdateBlogForSpecificUser`, input,
      { responseType: 'text' }
    )
  }

  deleteBlog(blogID: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Client/DeleteBlogForSpecificUser/${blogID}`, null,
       { responseType: 'text' }
    )
  }

  deleteUserAccount(): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.put(`${this.baseURL}/api/Admin/DeleteUserAccount`, null,
      {headers, responseType: 'text'}
    )
  }

  createPrivateGallery(input: CreatePrivateGalleryDTO): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.post(`${this.baseURL}/api/Client/UploadPrivateGalleryFiles`, input,
      {headers, responseType: 'text'})
  }

  updatePrivateGallery(input: UpdatePrivateGalleryDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Client/UpdatePrivateGalleryFile`, input,
      { responseType: 'text' }
    )
  }

  deletePrivateGallery(galleryID: number): Observable<any> {
    return this.http.put(`${this.baseURL}/api/Client/DeletePrivateGalleryFile/${galleryID}`, null,
     { responseType: 'text' }
    )
  }


  UpdatePersonalInformation(input: UpdateUserDTO): Observable<any> {
    let headers = new HttpHeaders().set('token', `${localStorage.getItem('token')}`);
    return this.http.put(`${this.baseURL}/api/Client/UpdatePersonalInformationForUserAcount`, input,
      {headers, responseType: 'text'}
    )
  }


  DownloadFile(input : string | undefined): Observable<any>{
    return this.http.get(`${this.baseURL}/api/Files/GetFiles/${input}`,{
      responseType: 'blob'
    })
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseURL}/api/Files/UploadImageAndGetURL`, formData, { responseType: 'text' });
  }


  uploadFiles(files: File[]): Observable<any[]> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name); // تأكد من استخدام 'files' بدلاً من 'file'
    });
  
    return this.http.post<any[]>(`${this.baseURL}/api/Files/UploadImagesAndGetURLs`, formData);
  }

  CreateComment(input : CreateCommentDTO ) : Observable<any>{
    return this.http.post(`${this.baseURL}/api/Guest/CreateNewComment`, input,
      { responseType: 'text'})
  }

  isLoggedIn(): boolean {
    // هذا الجزء يمكن أن يعتمد على فحص توكن JWT أو أي مؤشر آخر لتسجيل الدخول
    return !!localStorage.getItem('token');  // تحقق من وجود توكن للمستخدم
  }

  redirectToLogin() {
    this.router.navigate(['/signin']);  // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  }

}
