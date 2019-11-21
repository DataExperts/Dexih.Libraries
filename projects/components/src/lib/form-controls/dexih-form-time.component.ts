import { OnInit, Component, forwardRef, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-time',
    templateUrl: './dexih-form-time.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTimeComponent), multi: true }]
})
export class DexihFormTimeComponent implements AfterViewInit, ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string;
    @Input() border = true;

    dateError = '';

    hours: number;
    minutes: number;
    seconds: number;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    isDirty = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private _changeDetectionRef: ChangeDetectorRef) {

     }

    ngAfterViewInit() {
        this.updateTime();

        // workaround for change detection required when using Afterview Init https://github.com/angular/angular/issues/6005
        this._changeDetectionRef.detectChanges();
    }

    hasChanged($event: any) {
        if(this.hours === null) { this.hours = 0; }
        if(this.minutes === null) { this.minutes = 0; }
        if(this.seconds === null) { this.hours = 0; }

        this.value = this.zeroPad(this.hours) + ':' + this.zeroPad(this.minutes) + ':' + this.zeroPad(this.seconds);

        this.onChange(this.value);
        this.onTouched();
        this.validate();
        this.isDirty = true;
    }

    zeroPad(value: number) {

        if(value == null) { 
            return '00';
        }

        if(value >=0 && value <=9) {
            return '0' + value;
        }

        return value;
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
            this.updateTime();
        }
    }

    updateTime() {
        if (this.value) {
            let parsedTime = this.value.split(':');
            this.hours = Number(parsedTime[0]);
            if (parsedTime.length > 1) {
                this.minutes = Number(parsedTime[1]);
            }
            if (parsedTime.length > 2) {
                this.seconds = Number(parsedTime[2]);
            }
        } else {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }
    }

    validate() {
        if(+this.hours > 23) {
            this.hours = 23;
        }
        if(+this.hours < 0) {
            this.hours = 0;
        }
        if(+this.minutes > 59) {
            this.minutes = 59;
        }
        if(+this.minutes < 0) {
            this.minutes = 0;
        }
        if(+this.seconds > 59) {
            this.seconds = 59;
        }
        if(+this.seconds < 0) {
            this.seconds = 0;
        }
    }
}
