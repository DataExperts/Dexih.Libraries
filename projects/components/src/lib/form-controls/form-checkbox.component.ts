import { Component, forwardRef, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SharedFunctions } from './shared-functions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'form-checkbox',
    templateUrl: './form-checkbox.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormCheckboxComponent), multi: true }]
})
export class DFormCheckboxComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {
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

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    subscription: Subscription;
    control = new FormControl({value: this.isChecked(this.value), disabled: this.disabled});

    constructor() { }
    
    ngOnInit(): void {
        this.subscription = this.control.valueChanges.subscribe(value => {
            this.onChange(value ? this.checkedValue : this.unCheckedValue );
            this.onTouched();
        });
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.value) {
            this.control.setValue(this.isChecked(changes.value.currentValue));
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

    writeValue(value: boolean) {
        this.control.setValue(this.isChecked(value), { emitEvent: false });
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    isChecked(value): boolean {
        if (value === this.checkedValue) {
            return true;
        }
        if (value === this.unCheckedValue) {
            return false;
        }

        return null;
    }
}
