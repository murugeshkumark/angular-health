
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private AUTH_HEADER = "Authorization";

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req)
    return next.handle(this.addAuthenticationToken(req));
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    if (request.url.endsWith("/signin") || (request.url.endsWith("/register") && !(request.url.endsWith("/patients/register") || request.url.endsWith("/appointment/register") ) )|| request.method == 'OPTIONS') {
      console.debug("not adding token")
      return request;
    }
    let newRequest = request.clone({
      headers: request.headers
        .append(this.AUTH_HEADER, "Bearer " + localStorage.getItem("token"))
       // .append("Accept", "application/json")
    });
    console.log("after adding token")
    console.log(newRequest)
    return newRequest;
  }

}

