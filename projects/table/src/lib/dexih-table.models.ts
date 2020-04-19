import { Type } from '@angular/compiler';

export class TableItem {
    constructor(
        public index: number,
        public sortValue: any,
        public isSelected: boolean,
        public isFiltered: boolean) {
    }
}

export class Column {
    public name: any;
    public title: string;
    public format: string;
    public alignment: string;
    public class: string;
    public control: string;
    public iconClass: string;
    public footer: string;
    public header: string;
    public childColumns: Column[];
    public enum: Type;
    public tags: Tag[];
}

export class Tag {
    name: string;
    color: string;
}

export class TagState {
    public tag: Tag
    public isChecked = false;
}

export class ColumnOperations {

    // converts a date to a countdown string
    countDown(date: Date): string {
        const currentDate = new Date();

        // seconds between the two dates
        let delta = Math.max(0, Math.floor((date.getTime() - currentDate.getTime()) / 1000));
        let days: number;
        let hours: number;
        let minutes: number;
        let seconds: number;

        let time: string;

        days = Math.floor(delta / 86400);
        delta -= days * 86400;
        hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        seconds = delta % 60;

        time = days > 0 ? days + ' days ' : '';
        time = time + (hours > 0 ? hours + ' hours ' : '');
        time = time + (minutes > 0 && days === 0 ? minutes + ' minutes ' : '');
        time = time + (seconds > 0 && days === 0 && hours === 0 ? seconds + ' seconds ' : '');

        if (!time) {
            time = 'Complete';
        }

        return time;
    }

    // return the property value from any object.
    fetchFromObject(obj: any, prop: any): any {
        if ( typeof obj === 'undefined' || typeof prop === 'undefined' || obj === null || prop === null) {
            return null;
        }

        const propType = typeof prop;
        if (propType !== 'number') {
            // if the property has a "." recurse to the next nesting.
            const index = prop.indexOf('.');
            if (index > -1) {
                return this.fetchFromObject(obj[prop.substring(0, index)], prop.substr(index + 1));
            }
        }

        return obj[prop];
    }

    formatValue(column: Column, value: any) {
        if (!value && value !== false && value !== 0) {
            return '';
        } else if (Object.keys(value).length === 0 && value.constructor === Object) {
            return '(null)';
        } else {
            switch (column.format) {
                case 'Date':
                    return (new Date(value).toLocaleDateString());
                case 'Time':
                    return (new Date(value).toLocaleTimeString());
                case 'DateTime':
                    return (new Date(value).toLocaleDateString()) + ' ' + (new Date(value).toLocaleTimeString());
                case 'CharArray':
                    return [].concat(value).join('');
                case 'Countdown':
                    if (value instanceof Date) {
                        return this.countDown(value);
                    } else {
                        return this.countDown(new Date(value));
                    }
                case 'Enum':
                    if (column.enum) {
                        return column.enum[value];
                    } else {
                        return value;
                    }
                default:
                    return value;
            }
        }
    }
}
