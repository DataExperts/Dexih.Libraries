import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dexih-button-splitdropdown',
    templateUrl: 'dexih-button-splitdropdown.component.html',
    styleUrls: ['./dexih-button-dropdown.component.scss']
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

    constructor() { }

    ngOnInit() { }

    onClick($event: any) {
        this.buttonClick.emit($event);
    }
}
