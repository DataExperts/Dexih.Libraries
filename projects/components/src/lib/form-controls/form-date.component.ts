import { Component, forwardRef, Input, Output, EventEmitter, OnInit, HostListener, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,  } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-date',
    templateUrl: './form-date.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormDateComponent), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DFormDateComponent), multi: true }
    ]
})
export class DFormDateComponent implements OnInit, ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() subLabel: string;
    @Input() note: string;
    @Input() placeholder = 'Use format (yyyy-mm-dd)';
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string;
    @Input() disabled = false;
    @Input() border = true;
    @Input() floatingLabel: string;
    @Input() autoValidate = true;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('input', { static: true }) input: any;

    dateValue: any;

    isDirty = false;

    invalidDate = false;
    allErrors = null;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {
     }
    
    ngOnInit(): void {
        if (this.value) {
            this.updateError();
        }
        this.writeValue(this.value);
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
            if (!this.checkDate()) {
                return { validateDate: false};
            }
        }
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


    checkDate(): boolean {
        let theDate = Date.parse(this.value);
        if (theDate) {
            return true;
        } else {
            return false;
        }
    }

    updateError() {
        let dateError = this.checkDate() ? null : 'Invalid date, use format yyyy-mm-dd';
        if (!dateError) {
            this.allErrors = this.errors;
            return;
        }
        if (!this.errors) {
            this.allErrors = dateError;
            return;
        }
        this.allErrors = dateError + ' ' + this.errors;
    }

    keydownEvent($event: any) {
        this.keydown.emit($event);
        if ( $event.keyCode === 13) {
            this.updateError();
        }
    }

    // // detect a click outside the control, and add the tag
    // @HostListener('document:click', ['$event.target'])
    // public onClick(targetElement: any) {
    //     const clickedInside = this.input.nativeElement.contains(targetElement);
    //     if (!clickedInside) {
    //         this.updateError();
    //     }
    // }

    // tests for native browser support for input type date
    isDateSupported(): boolean {
        const input = document.createElement('input');
        const value = 'a';
        input.setAttribute('type', 'date');
        input.setAttribute('value', value);
        return (input.value !== value);
    };
    

}
