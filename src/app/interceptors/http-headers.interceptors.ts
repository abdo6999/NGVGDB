import { HttpEvent, HttpHandler , HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable ()
export class HttpHeadersInterceptors implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': '9e178478a7mshd61df63cda491bbp10d97ajsn3b115619ab58',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      },
      setParams: {
        key: '6454f352b87f4ef6ad0943928a8f6f69',
      }
    })
    return next.handle(req);
  }
}
