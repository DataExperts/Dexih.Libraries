import { Component, Input, ViewChild, HostListener } from '@angular/core';

@Component({
    selector: 'd-button-tag-dropdown',
    templateUrl: './d-tag-dropdown.component.html',
    styleUrls: []
})
export class DTagDropDownComponent {
    @Input() isOpen = false;

    @ViewChild('dropdownButton', { static: true }) dropdownElement: any;
    
    constructor() { }

    public dropdownToggle() {
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
