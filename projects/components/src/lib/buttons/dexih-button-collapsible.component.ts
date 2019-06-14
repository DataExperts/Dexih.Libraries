import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'dexih-button-collapsible',
    templateUrl: 'dexih-button-collapsible.component.html',
    animations: [
    trigger('slideDown', [
        state('hide', style({ height: 0, overflow: 'hidden' })),
        state('show', style({ height: '*', overflow: 'unset' })),
        transition('hide <=> show', animate('200ms ease-in')),
    ])
    ]
})

export class DexihButtonCollapsibleComponent implements OnInit {
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


    constructor() { }

    ngOnInit() { }

    onClick($event: any) {
        this.buttonClick.emit($event);
    }
}
