import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter',
})
export class TableFilterPipe implements PipeTransform {

  transform(items: any[], enablePages = true, rowsPerPage: number, pageNumber: number): any[] {
    if (!items) {
        return [];
    }

    if (enablePages) {
        let startRow = (pageNumber-1)*rowsPerPage;
        let endRow = pageNumber*rowsPerPage;
        let count = 0;
        return items.filter(c => {
            if(c.isFiltered) {
                return false;
            } else {
                let filter = count >= startRow && count < endRow;
                count++;
                return filter;
            }
        });
    } else {
        return items.filter(c => !c.isFiltered);
    }
  }
}

