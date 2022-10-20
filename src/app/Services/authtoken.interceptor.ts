import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.getUserFromLocalStorage();
        if(!user){
            return next.handle(req);
        }
        let token = `bearer ${user.token}`
        let modifiedReq = req.clone({
            headers: req.headers.append('Authorization', token)

        });
        return next.handle(modifiedReq);
    }
}