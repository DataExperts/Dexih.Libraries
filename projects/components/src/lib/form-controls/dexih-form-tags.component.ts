import { Component, forwardRef, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-tags',
    templateUrl: './dexih-form-tags.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTagsComponent), multi: true },
    ]
})
export class DexihFormTagsComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string[] = [];
    @Input() type = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() border = true;
    @Input() disabled = false;
    @Input() autocapitalize = 'none';

    isDirty = false;
    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    tag: string;

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
        if (this.tag) {
            if (!this.value) { this.value = []; }
            const index = this.value.findIndex(c => c === this.tag);
            if (index === -1) {
                this.value.push(this.tag);
                this.tag = '';
                this.hasChanged();
            }
        }
    }

    keydownEvent($event: any) {
        if ( $event.keyCode === 13) {
            this.addTag();
        }
    }

    remove(item: any) {
        if (!this.value) { return; }
        const index = this.value.findIndex(c => c === item);
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
