import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'd-button',
    templateUrl: './d-button.component.html',
    styleUrls: ['./d-button.component.scss']
})

export class DButtonComponent implements OnInit {
    @Input() buttonClass = 'btn btn-primary';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() routerLink: string;
    @Input() href: string;
    @Input() queryParamsHandling = 'merge';
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() compact = false;
    @Input() autoCompact = true;
    @Input() badge: string;
    @Input() badgeClass = '';
    @Input() fill = false;

    @Output() click = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    doClick() {
        this.click.emit(true);
    }
}
