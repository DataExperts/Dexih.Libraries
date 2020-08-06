import { OnInit, Component, forwardRef, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { SharedFunctions } from './shared-functions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'form-textarea',
    templateUrl: './form-textarea.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DFormTextAreaComponent), multi: true }],
    animations: [
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideDown', [
        state('hide', style({ 'height': '0px', opacity: 0, overflow: 'hidden' })),
        state('show', style({ 'height': '*', opacity: 1 })),
        transition('hide <=> show', animate('100ms ease-in')),
    ])
    ]
})
export class DFormTextAreaComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string = "";
    @Input() iconClass = 'fa fa-comment';
    @Input() errors: string;
    @Input() value: string;
    @Input() hideToggle = false;
    @Input() isHidden = true;
    @Input() rows = 5;
    @Input() disabled = false;
    @Input() showPreview = true;
    @Input() showCopy = false;
    @Input() border = true;

    // state: string;
    sharedFunctions = new SharedFunctions();

    id = 'input_' + Math.random().toString(36).substr(2, 9);

    onChange: any = () => { };
    onTouched: any = () => { };

    subscription: Subscription;
    control = new FormControl({value: this.value, disabled: this.disabled});

    constructor() {     }

     ngOnInit() {
         if ( this.hideToggle ) { this.isHidden = false; }
         this.subscription = this.control.valueChanges.subscribe(value => {
            this.onChange(value);
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

    toggleState() {
         this.isHidden = !this.isHidden;
        // this.state = this.isHidden ? 'hide' : 'show';
     }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string) {
        this.control.setValue(value, {emitEvent: false});
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    getRoute(event: any) {
        let isLink = this.sharedFunctions.getRoute(event);

        // if a link was not selected, then open the edit.
        if (!isLink) {
            this.isHidden = false;
        }
    }

    copyMessage() {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.control.value;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
      }
}