import { Component, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';

@Component({
    selector: 'dexih-button-tag-dropdown',
    templateUrl: './dexih-tag-dropdown.component.html',
    styleUrls: []
})
export class DexihTagDropDownComponent {
    @Input() isOpen = false;

    @ViewChild('dropdownButton', { static: true }) dropdownElement: any;
    
    constructor() { }

    public dropdownToggle($event) {
        this.isOpen = !this.isOpen;    
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        if (this.isOpen) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.isOpen = false;
            }
        }
    }
}
