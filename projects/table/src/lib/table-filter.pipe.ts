import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter',
})
export class TableFilterPipe implements PipeTransform {

  transform(items: any[], enablePages = true, rowsPerPage: number, pageNumber: number): any[] {
    if (!items) {
        return [];
    }

    let array;

    if (enablePages) {
        let startRow = (pageNumber-1) * rowsPerPage;
        let endRow = pageNumber * rowsPerPage;
        let count = 0;
        let arrayCount = 0;
        array = [rowsPerPage];
        for(let i = 0; i < items.length && arrayCount <= rowsPerPage; i++) {
          let c = items[i];
          if(c.isFiltered) {
            continue;
        } else {
          count++;
          if(count > startRow && count <= endRow)
            {
              array[arrayCount++] = c;
            }
        }
      }

      if(arrayCount != rowsPerPage) {
        array = array.slice(0, arrayCount);
      } else {
        array = array;
      }
      

    } else {
        array = items.filter(c => !c.isFiltered);
    }
    return array;
  }
}

