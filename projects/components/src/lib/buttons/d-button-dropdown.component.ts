import { Component, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';

@Component({
    selector: 'd-button-dropdown',
    templateUrl: './d-button-dropdown.component.html',
    styleUrls: ['../dexih-dropdown.scss', './d-button.component.scss']
})
export class DButtonDropDownComponent {
    @Input() buttonClass = 'btn btn-primary';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() pullRight = false;
    @Input() badge: string;
    @Input() badgeClass = '';
    @Input() hideCarrot = false;
    @Input() compact = false;
    @Input() autoCompact = true;
    @Input() autoClose = true;
    @Input() isOpen = false;

    @Output() isOpenChange = new EventEmitter<any>();

    @ViewChild('dropdownButton', { static: true }) dropdownElement: any;
    
    constructor() { }

    public openChange($event: any) {
        this.isOpenChange.emit($event);
    }

    public dropdownToggle($event) {
        this.isOpen = !this.isOpen;    
        this.isOpenChange.emit($event);    
    }

    public showDropdown($event) {
        this.isOpen = true;    
        this.isOpenChange.emit($event);    
    }

    public hideDropdown($event) {
        this.isOpen = false;    
        this.isOpenChange.emit($event);    
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        if (this.isOpen && this.autoClose) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.isOpen = false;
            }
        }
    }
}
