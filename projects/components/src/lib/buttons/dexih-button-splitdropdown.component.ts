import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';

@Component({
    selector: 'dexih-button-splitdropdown',
    templateUrl: 'dexih-button-splitdropdown.component.html',
    styleUrls: ['../dexih-dropdown.scss', './dexih-button.component.scss']
})

export class DexihButtonSplitDropDownComponent implements OnInit {
    @Input() buttonClass = 'btn-default';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() routerLink: string;
    @Input() queryParams: string;
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() pullRight = false;
    @Input() badge: string;
    @Input() badgeClass = '';
    @Output() buttonClick = new EventEmitter<any>();
    @Input() compact = false;
    @Input() autoCompact = true;
    @Input() isOpen = false;
    @Input() autoClose = true;
    @Output() isOpenChange = new EventEmitter<any>();

    @ViewChild('dropdownButton', { static: true }) dropdownElement: any;
    
    constructor() { }

    ngOnInit() { }

    onButtonClick($event: any) {
        this.buttonClick.emit($event);
    }

    public dropdownToggle($event) {
        this.isOpen = !this.isOpen;    
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
