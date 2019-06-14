import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-checkbox',
    templateUrl: './dexih-form-checkbox.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormCheckboxComponent), multi: true }]
})
export class DexihFormCheckboxComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: boolean;
    @Input() disabled = false;
    @Input() border = false;

    isDirty = false;
    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    hasChanged($even: any) {
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
    }
}
