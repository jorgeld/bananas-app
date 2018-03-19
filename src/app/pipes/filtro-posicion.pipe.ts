import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPosicion'
})
export class FiltroPosicionPipe implements PipeTransform {

  transform(value: any, searchText: string): any {
    if(!value) return [];
    if(!searchText) return value;

    searchText = searchText.toLowerCase();

    return value.filter( it => {
      // return it.posicion.toLowerCase().includes(searchText);
      return it.posicion.toLowerCase() === searchText;
    });
  }

}
