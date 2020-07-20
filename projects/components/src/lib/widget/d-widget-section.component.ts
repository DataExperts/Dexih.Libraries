import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'd-widget-section,div[d-widget-section]',
    templateUrl: 'd-widget-section.component.html',
    animations: [
        trigger('slideDown', [
            state('hide', style({ 'height': '0px', opacity: 0, overflow: 'hidden' })),
            state('show', style({ 'height': '*', opacity: 1 })),
            transition('hide <=> show', animate('200ms ease-in')),
        ]),
    ]    
})

export class DWidgetSectionComponent implements OnInit {
    @Input() public title: string;
    @Input() public subTitle: string;
    @Input() public subTitleClass = 'bg-light';
    @Input() public iconClass: string;
    @Input() public showExpandButton = false;
    @Input() public isExpanded = true;
    @Input() public sectionClass = 'text-white bg-info';
    @Input() public padding = true;

    @ContentChild('header', { static: true }) headerTemplate: TemplateRef<any>;
    @ContentChild('tools', { static: true }) toolsTemplate: TemplateRef<any>;
    @ContentChild('subTitle', { static: true }) subTitleTemplate: TemplateRef<any>;

    constructor() { }

    ngOnInit() { }
}