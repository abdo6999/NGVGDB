import { HttpEvent, HttpHandler , HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable ()
export class HttpHeadersInterceptors implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'X-RapidAPI-Key': 'a88cda9cb2mshdf2657cd8619800p167f6bjsnbb2790a03a52',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      },
      setParams: {
        key: 'a98cdf82b7ca4ef788ab22d546ddae7d',
      }
    })
    return next.handle(req);
  }
}