import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-checkbox',
    templateUrl: './form-checkbox.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormCheckboxComponent), multi: true }]
})
export class DFormCheckboxComponent implements OnInit, ControlValueAccessor {
    @Input() label: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: any;
    @Input() disabled = false;
    @Input() border = false;
    @Input() isSwitch = false;
    @Input() checkedValue: any = true;
    @Input() unCheckedValue: any = false;
    @Input() autoValidate = true;

    isDirty = false;
    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    isChecked = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }
    
    ngOnInit(): void {
        this.writeValue(this.value);
    }
    
    hasChanged($event: any) {
        if (this.isChecked) {
            this.value = this.checkedValue;
        } else {
            this.value = this.unCheckedValue;
        }

        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: boolean) {
        this.value = value;

        if (this.value === this.checkedValue) {
            this.isChecked = true;
        }
        if (this.value === this.unCheckedValue) {
            this.isChecked = false;
        }
    }
}
