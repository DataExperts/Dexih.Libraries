import { Component, forwardRef, Input, EventEmitter, Output, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SharedFunctions } from './shared-functions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'form-input, [formInput]',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DFormInputComponent),
            multi: true
        },
    ]
})
export class DFormInputComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {

    constructor() { }
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() showErrorMessage = true;
    @Input() value: any;
    @Input() type : 'text' | 'number' | 'password' | 'phone' = 'text'
    @Input() pattern: string;
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() disabled = false;
    @Input() border = true;
    @Input() autocapitalize = false;
    @Input() floatingLabel: string;
    @Input() autoValidate = true;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    subscription: Subscription;
    control: FormControl;

    onChange: any = () => { };
    onTouched: any = () => { };

    ngOnInit() {
        this.initControl();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.initControl();

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
        this.control.setValue(value, {
            emitEvent: false
        });
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    initControl() {
        if (!this.control) {
            this.control = new FormControl({value: this.value, disabled: this.disabled});

            this.subscription = this.control.valueChanges.subscribe(value => {
                // only update if touched to stop disabled states toggling the touch state
                if (!this.control.pristine) {
                    // checking the onChange.length is a workaround for error:
                    // "There is no FormControl instance attached to form control element with name:"
                    // it appears the onChange is reset when the control is reinitialized.
                    if(this.onChange.length > 0) {
                        this.onChange(value);
                        this.onTouched();
                }
            }
            });

            return;
        }
    }

    keydownEvent($event: any) {
        this.keydown.emit($event);
    }
}
