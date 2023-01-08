import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../modele';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url:string = 'https://api.rawg.io/api';
  constructor(private http : HttpClient) { }
  getGameList(
    ordering : string ,
     search? : string
     ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      let params = new HttpParams().set('ordering', ordering).set('search',search);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{
      params : params,
    });
  }
  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${this.url}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${this.url}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(`${this.url}/games/${id}/screenshots`);
    return forkJoin({gameInfoRequest, gameTrailersRequest, gameScreenshotsRequest}).pipe(
      map((resp: any)=> {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        }
      })
    )
  }
}

