import { Component, OnInit, Input, Output, EventEmitter, forwardRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ListItem } from './shared-functions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'base-input',
    templateUrl: 'base-input.component.html',
    styleUrls: ['./form.component.scss', './base-input.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => BaseInputComponent), multi: true }]
})

export class BaseInputComponent implements ControlValueAccessor, OnInit {
    @Input() labelLeft: string;
    @Input() errors: string;
    @Input() value: any;
    @Input() iconClass: string = null; // only displays where there are no elements.
    @Input() border = true;
    @Input() autocapitalize = 'none';
    @Input() floatingLabel: string;
    @Input() placeholder: string;
    @Input() readonly = false;
    @Input() disabled = false;
    @Input() type = 'text';
    @Input() pattern;
    @Input() step;
    @Input() maxlength: number;
    @Input() fontItalic = false;
    @Input() tags: ListItem[];
    @Input() tagItemName: string;
    @Input() autoValidate = true;
    @Input() enableFloatingAnimation = true;
    @Input() hideInput = false;

    @Output() keyDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() arrowDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() arrowUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() removeTag: EventEmitter<any> = new EventEmitter<any>();

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    isDirty = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    subscription: Subscription;
    control = new FormControl({value: this.value, disabled: this.disabled});

    ngOnInit() { 
        this.subscription = this.control.valueChanges.subscribe(value => {
            if(this.type.toLocaleLowerCase() == 'number') { 
                this.onChange(+value);
            } else {
                this.onChange(value);
            }
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
    
    writeValue(value: any): void {
        this.control.setValue(value, { emitEvent: false });
    }
    
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    keydownEvent($event: any) {
        this.keyDown.emit($event);
    }




}