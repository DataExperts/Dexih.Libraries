import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[removeWrapper]'
 })
 export class DexihRemoveWrapperDirective {
    constructor(private el: ElementRef) {
        const parentElement = el.nativeElement.parentElement;
        const element = el.nativeElement;

        if (parentElement && parentElement.parentNode) {
            parentElement.removeChild(element);
            parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
            parentElement.parentNode.removeChild(parentElement);
        }
    }
 }
