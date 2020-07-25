import { OnInit, Component, forwardRef, Input, AfterViewInit, ChangeDetectorRef, Output, EventEmitter, ViewChild, HostListener, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SharedFunctions } from './shared-functions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'form-time',
    templateUrl: './form-time.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormTimeComponent), multi: true }]
})
export class DFormTimeComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string;
    @Input() border = true;
    @Input() disabled = false;
    @Input() subLabel: string;
    @Input() floatingLabel: string;
    @Input() placeholder: string;
    @Input() disableNative = false;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();
    
    @ViewChild('input', { static: true }) input: any;
    
    allErrors = '';

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    timeSupported = this.isTimeSupported();

    subscription: Subscription;
    control = new FormControl({value: this.value, disabled: this.disabled});


    constructor() { }

    ngOnInit(): void {
        this.subscription = this.control.valueChanges.subscribe(value => {
            this.updateError();
            this.onChange(this.timeToValue(value));
            this.onTouched();
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

    private timeToValue(timeValue) {
        if(timeValue) {
            let timeParts = timeValue.split(':');
            if(timeParts.length > 3 || timeParts.length == 0) {
                return undefined;            
            }

            let hours = +timeParts[0];
            let minutes = timeParts.length > 1 ? +timeParts[1] : 0;
            let seconds = timeParts.length > 2 ? +timeParts[2] : 0;

            if(hours >= 0 && hours <= 23 && minutes >= 0 && minutes < 59 && seconds >=0 && seconds <= 59) {
                return this.pad(hours, 2) + ':' + this.pad(minutes, 2) + ':' + this.pad(seconds, 2);
            }
        }

        return undefined;  
    }


    pad(num: number, size: number) {
        let s = '000000000' + num;
        return s.substr(s.length - size);
    }

    updateError() {
        let theDate = Date.parse('2000-01-01T' + this.control.value);
        let dateError = theDate ? null : 'Invalid time, use 24 hour format HH-mm-ss';
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

    // tests for native browser support for input type time
    isTimeSupported(): boolean {
        const input = document.createElement('input');
        const value = 'a';
        input.setAttribute('type', 'time');
        input.setAttribute('value', value);
        return (input.value !== value);
    };

}
