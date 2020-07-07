import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './shared-functions';

@Component({
    selector: 'base-input',
    templateUrl: 'base-input.component.html',
    styleUrls: ['./dexih-form.component.scss', './base-input.component.scss'],
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
    @Input() maxlength: number;
    @Input() fontItalic = false;
    @Input() tags: ListItem[];
    @Input() tagItemName: string;

    @Output() keyDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() arrowDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() arrowUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() removeTag: EventEmitter<any> = new EventEmitter<any>();

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    isDirty = false;

    onChange: any = () => { };
    onTouched: any = () => { };


    writeValue(value: any): void {
        this.value = value;
    }
    
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    
    setDisabledState?(isDisabled: boolean): void {
       this.disabled = isDisabled;
    }
    
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

    keydownEvent($event: any) {
        this.keyDown.emit($event);
    }




    ngOnInit() { }
}