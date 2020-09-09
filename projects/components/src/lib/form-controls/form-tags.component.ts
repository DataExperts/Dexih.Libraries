import { Component, forwardRef, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-tags',
    templateUrl: './form-tags.component.html',
    styleUrls: ['./form.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormTagsComponent), multi: true },
    ]
})
export class DFormTagsComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string[] = [];
    @Input() type : 'text' | 'number' = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() border = true;
    @Input() disabled = false;
    @Input() autocapitalize = 'none';
    @Input() floatingLabel: string;
    @Input() autoValidate = true;

    isDirty = false;
    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    control = new FormControl({value: '', disabled: this.disabled});

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    hasChanged() {
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

    writeValue(value: string[]) {
        // if (value) {
            this.value = value;
        // }
    }

    addTag() {
        if (this.control.value) {
            if (!this.value) { this.value = []; }
            const index = this.value.findIndex(c => c === this.control.value);
            if (index === -1) {
                this.value.push(this.control.value);
                this.control.setValue('');
                this.hasChanged();
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

    keydownEvent($event: any) {
        if ( $event.keyCode === 13) {
            this.addTag();
        }
    }

    remove(index: any) {
        if (index >= 0) {
            this.value.splice(index, 1);
            this.hasChanged();
        }
    }

    // detect a click outside the control, and add the tag
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        this.addTag();
    }
}
