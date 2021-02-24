import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'sortIngresoType'
})
export class SortIngresoTypePipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort((a, b) => {
      if(a.tipo == 'ingreso') return -1;
      else return 1;
    });
  }

}
