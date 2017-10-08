
import { Router , ActivatedRoute } from '@angular/router';
import { HeroesService } from './../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {
  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };
  nuevo: false = false;
  id = '';

  constructor(
    private _heroesService: HeroesService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this._ActivatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== 'nuevo') {
        this._heroesService
          .getHeroe(this.id)
          .subscribe(data => (this.heroe = data));
      }
    });
  }

  ngOnInit() {}
  guardar() {
    // console.log(this.heroe);
    if (this.id === 'nuevo') {
      // insertar
      this._heroesService.nuevoHeroe(this.heroe).subscribe(
        data => {
          this._Router.navigate(['/heroes']);
        },
        error => console.log(error)
      );
    } else {
      // actualizar
      this._heroesService.actualizarHeroe(this.heroe, this.id).subscribe(
        data => {
           // this._Router.navigate(['/heroe', data.name]);
          // console.log(data);
        },
        error => console.log(error)
      );
    }
  }

  agregaNuevo(forma: NgForm) {
    this._Router.navigate(['/heroe', 'nuevo']);

    forma.reset(
      {
        casa: 'Marvel'
      }
    );
  }
}
