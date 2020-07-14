import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dexih-dropdown-item',
    templateUrl: 'dexih-dropdown-item.component.html'
})

export class DexihDropDownItem implements OnInit {
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