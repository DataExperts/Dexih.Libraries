import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap';

@Component({
    selector: 'dexih-button-dropdown',
    templateUrl: './dexih-button-dropdown.component.html',
    styleUrls: ['./dexih-button-dropdown.component.scss']
})
export class DexihButtonDropDownComponent {
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

    @ViewChild('dropdown', { static: true }) dropdown: BsDropdownDirective;

    constructor() { }

    public showDropdown() {
        this.dropdown.show();
    }

    public hideDropdown() {
        this.dropdown.hide();
    }

    public openChange($event: any) {
        this.isOpenChange.emit($event);
    }
}
