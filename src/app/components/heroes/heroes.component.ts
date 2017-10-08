import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes: Heroe[] = [];
  loading = true;

  constructor(private _HeroesService: HeroesService) {
    this._HeroesService.getHeroes().subscribe(data => {

        this.heroes = data;
        this.loading = false;

      // setTimeout(() => {
      //   this.heroes = data;
      //   this.loading = false;
      // }, 3000);


    });
  }

  ngOnInit() {}

  borraHeroe(key$: string ) {
    this._HeroesService.borrarHeroe( key$ )
        .subscribe( res => {
          if (res) {
            console.log(res);
          }else {
            delete this.heroes[key$];
          }

        });
  }
}
