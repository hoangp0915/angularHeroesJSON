import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  searchHero(name: string):void{
    name ? this.heroService.searchHero(name).subscribe(heroes => this.heroes = heroes) : this.getHeroes()
  }
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    );
  }
  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(
      () => {
        this.getHeroes();
        this.toastr.success('Deleted')
      } 
    );
  }
  constructor(private heroService: HeroService, private route: ActivatedRoute, private toastr: ToastrService) { }
  ngOnInit() {
    this.getHeroes(); 
    // console.log(this.heroService.genID(this.heroes)); 
    // console.log(Math.max(...this.heroes.map(hero => hero.id)));
  }
  
} 
