import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
@Injectable()
export class DexihSelectFilterPipe implements PipeTransform {
    transform(items: any[], field: string, filter: string): any {
        if (!items) {
            return [];
        }
        if (filter) {
            const filterString = filter.toLowerCase();
            if (field) {
                return items.filter(c => c[field].toLowerCase().includes(filterString) );
            } else {
                return items.filter(c => c.toLowerCase().includes(filterString));
            }
        } else {
            return items;
        }
    }
}
