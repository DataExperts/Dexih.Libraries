import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormArray, FormControl } from '@angular/forms';
import { SharedFunctions } from './shared-functions';
import { Subscription } from 'rxjs';

export enum eDayOfWeek {
    Sunday = 1,
    Monday = 2,
    Tuesday = 3,
    Wednesday = 4,
    Thursday = 5,
    Friday = 6,
    Saturday = 7
}

@Component({
    selector: 'form-daysofweek',
    templateUrl: './form-daysofweek.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormDaysOfWeekComponent), multi: true }]
})
export class DFormDaysOfWeekComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: eDayOfWeek[];
    @Input() disabled = false;
    @Input() showHelper = true;

    eDayOfWeek = eDayOfWeek;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    subscription: Subscription;
    control: FormArray;

    constructor() {
        this.control = new FormArray([]);

        for (let i = 0; i < 7; i++) {
            if (this.value && this.value.length > 0) {
                this.control.push(new FormControl(this.value.indexOf(i + 1) >= 0));
            } else {
                this.control.push(new FormControl(false));
            }
        }

    }

    ngOnInit() {
        if (this.disabled) {
            this.control.disable();
        }

        this.subscription = this.control.valueChanges.subscribe((value: Array<boolean>) => {
            let daysOfWeek: Array<eDayOfWeek> = [];
            for (let i = 0; i < 7; i++) {
                if (value[i]) {
                    daysOfWeek.push(<eDayOfWeek>i + 1);
                }
            }

            this.onChange(daysOfWeek);
            this.onTouched();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: Array<eDayOfWeek>) {
        for (let i = 0; i < 7; i++) {
            if (value && value.length > 0) {
                this.control.controls[i].setValue(value.indexOf(i + 1) >= 0, {emitEvent: false});
            } else {
                this.control.controls[i].setValue(false, {emitEvent: false});
            }
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    selectWeekend() {
        for (let i = 0; i < 7; i++) {
            this.control.controls[i].setValue(i == 0 || i == 6);
        }
    }

    selectWeekDays() {
        for (let i = 0; i < 7; i++) {
            this.control.controls[i].setValue(i != 0 && i != 6);
        }
    }

    selectAllDays() {
        for (let i = 0; i < 7; i++) {
            this.control.controls[i].setValue(true);
        }
    }

    selectNoDays() {
        for (let i = 0; i < 7; i++) {
            this.control.controls[i].setValue(false);
        }
    }
}
