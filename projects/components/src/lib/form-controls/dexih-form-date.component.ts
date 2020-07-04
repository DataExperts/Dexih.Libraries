import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,  } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-date',
    templateUrl: './dexih-form-date.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormDateComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DexihFormDateComponent), multi: true }
    ]
})
export class DexihFormDateComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() subLabel: string;
    @Input() note: string;
    @Input() placeholder = 'Enter date (yyyy-mm-dd)';
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string;
    @Input() disabled = false;
    @Input() border = true;
    @Input() floatingLabel: string;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();

    dateValue: any;
    isValidDate = false;

    isDirty = false;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {

     }

    hasChanged() {
        this.valueToDate();

        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
    }

    dateChanged() {
        if (this.dateValue) {
            this.dateToValue();
        } else {
            this.value = '';
        }

        this.onChange(this.value);
        this.onTouched();
    }

    private dateToValue() {
        if (this.dateValue) {
            this.value  = this.pad(this.dateValue.date.year, 4) + '-' + this.pad(this.dateValue.date.month, 2)
                        + '-' + this.pad(this.dateValue.date.day, 2);
        } else {
            this.value = '';
        }
    }

    pad(num: number, size: number) {
        let s = '000000000' + num;
        return s.substr(s.length - size);
    }

    private valueToDate() {
        if (this.value) {
            let theDate = this.value ? new Date(this.value) : null;
            this.dateValue = { date: { year: theDate.getFullYear(), month: theDate.getMonth() + 1, day: theDate.getDate() }};
        } else {
            this.dateValue = null;
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string) {
        if (value) {
            this.value = value;
            this.valueToDate();
            this.dateToValue();
        }
    }


    validate(): {[key: string]: any} {
        if (this.value) {
            let theDate = Date.parse(this.value);
            if (!theDate) {
                return { validateDate: false};
            }
        }
    }

    keydownEvent($event: any) {
        this.keydown.emit($event);
    }

}
