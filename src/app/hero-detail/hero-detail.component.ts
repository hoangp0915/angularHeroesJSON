import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HeroService } from '../hero.service';
import {Location} from '@angular/common';
import { Hero } from '../hero';
import { from } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor( private route: ActivatedRoute,
            private heroService: HeroService ,
            private location:  Location
    ) { }

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get('id');
    if(param){
      const id = +param;
      this.getHero(id);
    }
  }
  getHero(id: number): void{
    this.heroService.getHero(id).subscribe(
      hero => this.hero = hero
    )
  }
  goBack(){
    this.location.back();
  }
  save(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.updateHero(this.hero,id).subscribe(() => this.goBack())
    console.log(this.hero);
  }
}
