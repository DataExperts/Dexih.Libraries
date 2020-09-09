import { Component, forwardRef, Input, Output, EventEmitter, OnInit, HostListener, ViewChild, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl,  } from '@angular/forms';
import { SharedFunctions } from './shared-functions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'form-date',
    templateUrl: './form-date.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormDateComponent), multi: true }
    ]
})
export class DFormDateComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
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
    @Input() disableNative = false;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('input', { static: true }) input: any;

    allErrors = null;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    subscription: Subscription;
    control = new FormControl({value: this.value, disabled: this.disabled});

    constructor() {
     }
    
    ngOnInit(): void {
        this.subscription = this.control.valueChanges.subscribe(value => {
            this.updateError();
            if (!this.control.pristine) {
                this.onChange(this.dateToValue(value));
                this.onTouched();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes.value) {
            this.control.setValue(changes.value.currentValue);
        }

        if (changes.disabled) {
            if (changes.disabled.currentValue) {
                this.control.disable();
            } else {
                this.control.enable();
            }
        }
    }
 
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string) {
        this.control.setValue(value, { emitEvent: false});
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    private dateToValue(dateValue) {
        if (dateValue) {
            let theDate = dateValue ? new Date(dateValue) : null;
            if (theDate) {
                return this.pad(theDate.getFullYear(), 4) + '-' + this.pad(theDate.getMonth() + 1, 2)
                + '-' + this.pad(theDate.getDate(), 2);
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    pad(num: number, size: number) {
        let s = '000000000' + num;
        return s.substr(s.length - size);
    }

    updateError() {
        let theDate = Date.parse(this.control.value);
        let dateError = theDate ? null : 'Invalid date, use format yyyy-mm-dd';
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

    // // tests for native browser support for input type date
    // isDateSupported(): boolean {
    //     const input = document.createElement('input');
    //     const value = 'a';
    //     input.setAttribute('type', 'date');
    //     input.setAttribute('value', value);
    //     return (input.value !== value);
    // };
    

}
