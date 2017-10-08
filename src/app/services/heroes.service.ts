
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {
  heroesURL = 'https://heroesapp-8e833.firebaseio.com/heroes.json';
  heroeURL = 'https://heroesapp-8e833.firebaseio.com/heroes/';

  constructor(private http: Http) {}

  nuevoHeroe(heroe: Heroe) {
    const body = JSON.stringify(heroe);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.heroesURL, body, { headers }).map(res => {
      // console.log(res.json());
      return res.json();
    });
  }

  actualizarHeroe(heroe: Heroe, key$: string) {
    const body = JSON.stringify(heroe);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.heroeURL}/${key$}.json`;

    return this.http.put(url, body, { headers }).map(res => {
      // console.log(res.json());
      return res.json();
    });
  }

  getHeroe(key$: string) {
    const _url = `${this.heroeURL}/${key$}.json `;
    return this.http.get(_url).map(res => res.json());
  }
  getHeroes() {
    return this.http.get(this.heroesURL).map(res => res.json());
  }
  borrarHeroe(key$: String) {
        const _url = `${this.heroeURL}/${key$}.json `;
        return this.http.delete(_url).map(res => res.json());
  }

}
