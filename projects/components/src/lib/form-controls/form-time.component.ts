import { OnInit, Component, forwardRef, Input, AfterViewInit, ChangeDetectorRef, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-time',
    templateUrl: './form-time.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormTimeComponent), multi: true }]
})
export class DFormTimeComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string;
    @Input() border = true;
    @Input() disabled = false;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
    
    @ViewChild('input', { static: true }) input: any;
    
    allErrors = '';

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    isDirty = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    timeSupported = this.isTimeSupported();

    constructor(private _changeDetectionRef: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        if (this.value) {
            this.updateError();
        }
        this.writeValue(this.value);
    }
    

    ngAfterViewInit() {
        // workaround for change detection required when using Afterview Init https://github.com/angular/angular/issues/6005
        // this._changeDetectionRef.detectChanges();
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
            // this.updateTime();
        }
    }

    validate(): {[key: string]: any} {
        if (this.value) {
            if (!this.checkTime()) {
                return { validateTime: false};
            }
        }
    }

    hasChanged() {
        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
    }

    checkTime(): string {
        let timeParts = this.value.split(':');
        if(timeParts.length > 3 || timeParts.length == 0) {
            return undefined;            
        }

        let hours = +timeParts[0];
        let minutes = timeParts.length > 1 ? +timeParts[1] : 0;
        let seconds = timeParts.length > 2 ? +timeParts[2] : 0;

        if(hours >= 0 && hours <= 23 && minutes >= 0 && minutes < 59 && seconds >=0 && seconds <= 59) {
            return this.pad(hours, 2) + ':' + this.pad(minutes, 2) + ':' + this.pad(seconds, 2);
        }

        return undefined;            
    }

    pad(num: number, size: number) {
        let s = '000000000' + num;
        return s.substr(s.length - size);
    }

    updateError() {
        let dateError = this.checkTime() ? null : 'Invalid time, use 24 hour format HH-mm-ss';
        if (!dateError) {
            this.updateTime();
            this.allErrors = this.errors;
            return;
        }
        if (!this.errors) {
            this.allErrors = dateError;
            return;
        }
        this.allErrors = dateError + ' ' + this.errors;
    }

    updateTime() {
        if (!this.timeSupported) {
            let theDate = this.checkTime();
            if (theDate) {
                this.value = theDate;
                this.hasChanged()
            }
        }
    }

    keydownEvent($event: any) {
        this.keydown.emit($event);
        if ( $event.keyCode === 13) {
            this.updateError();
        }
    }

    // tests for native browser support for input type time
    isTimeSupported(): boolean {
        const input = document.createElement('input');
        const value = 'a';
        input.setAttribute('type', 'time');
        input.setAttribute('value', value);
        return (input.value !== value);
    };

}
