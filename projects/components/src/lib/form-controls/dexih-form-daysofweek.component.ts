import { Component, forwardRef, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

export enum eDayOfWeek {
    Sunday = <any>'Sunday',
    Monday = <any>'Monday',
    Tuesday  = <any>'Tuesday',
    Wednesday = <any>'Wednesday',
    Thursday  = <any>'Thursday',
    Friday = <any>'Friday',
    Saturday  = <any>'Saturday'
}

@Component({
    selector: 'form-daysofweek',
    templateUrl: './dexih-form-daysofweek.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormDaysOfWeekComponent), multi: true }]
})
export class DexihFormDaysOfWeekComponent implements ControlValueAccessor, AfterViewInit {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: eDayOfWeek[];

    eDayOfWeek = eDayOfWeek;
    daysOfWeek = new Array<Boolean>(7);
    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private _changeDetectionRef: ChangeDetectorRef) {

    }

    ngAfterViewInit()  {
        if (this.value) {
            this.value.forEach(value => {
                switch (value) {
                    case eDayOfWeek.Sunday: this.daysOfWeek[0] = true; break;
                    case eDayOfWeek.Monday: this.daysOfWeek[1] = true; break;
                    case eDayOfWeek.Tuesday: this.daysOfWeek[2] = true; break;
                    case eDayOfWeek.Wednesday: this.daysOfWeek[3] = true; break;
                    case eDayOfWeek.Thursday: this.daysOfWeek[4] = true; break;
                    case eDayOfWeek.Friday: this.daysOfWeek[5] = true; break;
                    case eDayOfWeek.Saturday: this.daysOfWeek[6] = true; break;
                }
            });
        }

        // workaround for change detection required when using Afterview Init https://github.com/angular/angular/issues/6005
        this._changeDetectionRef.detectChanges();
    }

    hasChanged($event: any) {
        let daysOfWeek = new Array<eDayOfWeek>();
        if (this.daysOfWeek[0]) { daysOfWeek.push(eDayOfWeek.Sunday); }
        if (this.daysOfWeek[1]) { daysOfWeek.push(eDayOfWeek.Monday); }
        if (this.daysOfWeek[2]) { daysOfWeek.push(eDayOfWeek.Tuesday); }
        if (this.daysOfWeek[3]) { daysOfWeek.push(eDayOfWeek.Wednesday); }
        if (this.daysOfWeek[4]) { daysOfWeek.push(eDayOfWeek.Thursday); }
        if (this.daysOfWeek[5]) { daysOfWeek.push(eDayOfWeek.Friday); }
        if (this.daysOfWeek[6]) { daysOfWeek.push(eDayOfWeek.Saturday); }

        this.value = daysOfWeek;

        this.onChange(this.value);
        this.onTouched();
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: any) {
        if (value) {
            this.value = value;
        }
    }

    selectWeekend() {
      this.daysOfWeek[0] = true;
      this.daysOfWeek[1] = false;
      this.daysOfWeek[2] = false;
      this.daysOfWeek[3] = false;
      this.daysOfWeek[4] = false;
      this.daysOfWeek[5] = false;
      this.daysOfWeek[6] = true;
      this.hasChanged(null);
  }

  selectWeekDays() {
      this.daysOfWeek[0] = false;
      this.daysOfWeek[1] = true;
      this.daysOfWeek[2] = true;
      this.daysOfWeek[3] = true;
      this.daysOfWeek[4] = true;
      this.daysOfWeek[5] = true;
      this.daysOfWeek[6] = false;
      this.hasChanged(null);
  }

    selectAllDays() {
      this.daysOfWeek[0] = true;
      this.daysOfWeek[1] = true;
      this.daysOfWeek[2] = true;
      this.daysOfWeek[3] = true;
      this.daysOfWeek[4] = true;
      this.daysOfWeek[5] = true;
      this.daysOfWeek[6] = true;
      this.hasChanged(null);
  }

    selectNoDays() {
      this.daysOfWeek[0] = false;
      this.daysOfWeek[1] = false;
      this.daysOfWeek[2] = false;
      this.daysOfWeek[3] = false;
      this.daysOfWeek[4] = false;
      this.daysOfWeek[5] = false;
      this.daysOfWeek[6] = false;
      this.hasChanged(null);
    }
}
