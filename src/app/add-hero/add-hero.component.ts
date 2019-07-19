import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {Location} from '@angular/common'
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {

  constructor( private heroService: HeroService, private location: Location ,private toastr: ToastrService) { }
  heroes: Hero[];
  name: string;
  ngOnInit() {

  }
  
  addHero(name: string){
    this.heroService.addHero({name} as Hero).subscribe(
      () => this.toastr.success(`Add ${name} success` )
    );
  }
  onBack(){
    this.location.back();
  }
}
