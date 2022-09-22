import { APIResponse, Game } from './../../modele';
import { HttpService } from './../../services/http.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort !: string;
  public games!: Array<Game>;
  public gameId !: string;
  private subrouter!: Subscription;
  private subgame!: Subscription;
  constructor(
    private httpser: HttpService,
    private router : Router,
    private activetedRoutr: ActivatedRoute) { }

  ngOnInit(): void {
    this.subrouter = this.activetedRoutr.params.subscribe((params : Params) => {
      if (params['game-search']) {
        this.searchGame('matacritic',params['game-search']);
      } else {
        this.searchGame('matacritic')
      }
    })  
  }
  searchGame(sort: string, search?: string):void {
    this.subgame = this.httpser
    .getGameList(sort,search)
    .subscribe((gameList: APIResponse<Game>)=> {
      this.games = gameList.results;
      console.log(gameList.results)
    })
  }
  openGameDetailes(id: string) {
    this.router.navigate(['detailes', id]);
    this.gameId = id; 
  }
  ngOnDestroy() : void {
    if (this.subgame) {
      this.subgame.unsubscribe();
    }
    if (this.subrouter) {
      this.subrouter.unsubscribe();
    }
  }
}
