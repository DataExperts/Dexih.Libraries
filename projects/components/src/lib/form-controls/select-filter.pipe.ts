import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
@Injectable()
export class DSelectFilterPipe implements PipeTransform {
    transform(items: any[], field: string, filter: string): any {
        if (!items) {
            return [];
        }
        if (filter) {
            const filterString = filter.toLowerCase();
            if (field) {
                return items.filter(c => c[field] && c[field].toString().toLowerCase().includes(filterString) );
            } else {
                return items.filter(c => c && c.toString().toLowerCase().includes(filterString));
            }
        } else {
            return items;
        }
    }
}
