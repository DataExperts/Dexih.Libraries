import { Component, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

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
export class DFormInputComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: any;
    @Input() type = 'text';
    @Input() pattern: string;
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() disabled = false;
    @Input() border = true;
    @Input() autocapitalize = 'none';
    @Input() floatingLabel: string;
    @Input() autoValidate = true;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();

    isDirty = false;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    hasChanged($event: any) {
        if(this.type.toLocaleLowerCase() == 'number') { 
            this.value = +$event;
        } else {
            this.value = $event;
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

    writeValue(value: string) {
        this.value = value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    keydownEvent($event: any) {
        this.keydown.emit($event);
    }
}
