import { HttpEvent, HttpHandler , HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable ()
export class HttpHeadersInterceptors implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
	   'X-RapidAPI-Key': '834bf390f1mshfea3e184da01d65p1165ffjsnf528a98caec2',
    	   'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '6454f352b87f4ef6ad0943928a8f6f69',
      }
    })
    return next.handle(req);
  }
}
