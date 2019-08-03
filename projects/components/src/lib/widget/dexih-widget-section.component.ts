import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'dexih-widget-section,div[dexihWidgetSection]',
    templateUrl: 'dexih-widget-section.component.html',
    animations: [
        trigger('slideDown', [
            state('hide', style({ height: 0, opacity: 0 })),
            state('show', style({ height: '*', opacity: 1 })),
            transition('hide <=> show', animate('200ms ease-in')),
        ]),
    ]    
})

export class DexihWidgetSectionComponent implements OnInit {
    @Input() public title: string;
    @Input() public subTitle: string;
    @Input() public iconClass: string;
    @Input() public showExpandButton = false;
    @Input() public isExpanded = true;
    @Input() public sectionClass = 'text-white bg-info';
    @Input() public padding = true;

    @ContentChild('header', { static: true }) headerTemplate: TemplateRef<any>;
    
    constructor() { }

    ngOnInit() { }
}