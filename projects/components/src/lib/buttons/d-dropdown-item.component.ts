import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'd-dropdown-item',
    templateUrl: 'd-dropdown-item.component.html'
})

export class DDropDownItem implements OnInit {
    @Input() iconClass: string;
    @Input() title: string;
    @Input() routerLink: string;
    @Input() href: string;
    @Input() queryParamsHandling = 'merge';
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() badge: string;
    @Input() badgeClass = '';
    
    constructor() { }

    ngOnInit() { }
}