import { Pipe, PipeTransform } from '@angular/core';
export interface Option {
  key: string;
  reverse: boolean;
}
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: any[], option: Option): any[] {
    array.sort((a: any, b: any) => {
      if (a[option.key] < b[option.key]) {
        return -1;
      } else if (a[option.key] > b[option.key]) {
        return 1;
      } else {
        return 0;
      }
    });
    if (option.reverse) {
      return array.reverse();
    } else {
      return array;
    }
  }
}
