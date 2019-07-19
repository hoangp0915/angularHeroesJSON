import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable, from, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Hero } from './hero';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl: string = 'http://localhost:3000/heroes';
  constructor( 
    private http: HttpClient
  ) { }
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.apiUrl).pipe(
      tap(data => JSON.stringify(data))
    );
  }
  getHero(id: number): Observable<Hero>{
    return this.http.get<Hero>(`${this.apiUrl}/${id}`).pipe(
      tap(data => JSON.stringify(data))
    )
  }
  updateHero (hero: Hero, id:number): Observable<Hero> {
    return this.http.put<Hero>(this.apiUrl + '/' + id, hero, httpOptions)
  } 
  deleteHero(id: number): Observable<Hero> {
    const url = this.apiUrl + '/' + id;
    return this.http.delete<Hero>(url, httpOptions);
  }
  searchHero(name: string): Observable<Hero[]>{
    if(!name.trim()){
      return of([]);
    }
    const url = `${this.apiUrl}/?name_like=${name}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(data => JSON.stringify(data))
    );
  }
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.apiUrl, hero, httpOptions);
  }
}
