import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'd-button-collapsible',
    templateUrl: 'd-button-collapsible.component.html',
    styleUrls: ['./d-button.component.scss'],
    animations: [
    trigger('slideDown', [
        state('hide', style({ height: 0, overflow: 'hidden' })),
        state('show', style({ height: '*', overflow: 'unset' })),
        transition('hide <=> show', animate('200ms ease-in')),
    ])
    ]
})

export class DButtonCollapsibleComponent implements OnInit {
    @Input() buttonClass = 'btn btn-primary';
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
    @Input() isExpanded = true;
    @Output() buttonClick = new EventEmitter<any>();
    @Input() compact = false;
    @Input() autoCompact = true;


    constructor() { }

    ngOnInit() { }

    onClick($event: any) {
        this.buttonClick.emit($event);
    }
}
