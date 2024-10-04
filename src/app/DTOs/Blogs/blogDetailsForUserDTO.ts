import { CommentDTO } from "../comment/commentDTO";
import { BlogAttachementDTO } from "./blogAttachementDTO";

export class BlogDetailsForUserDTO{
    id : number | undefined;
    title: string | undefined; 
    article : string | undefined;
    blogDate : Date | undefined;
    authorName : string | undefined;
    status: string | undefined;
    blogAttachments : BlogAttachementDTO [] | undefined;
    comments : CommentDTO [] | undefined;
    constructor(id?: number, title?: string, article?: string, blogDate?: Date, authorName?: string) {
        this.id = id;
        this.title = title;
        this.article = article;
        this.blogDate = blogDate;
        this.authorName = authorName;

      }
}