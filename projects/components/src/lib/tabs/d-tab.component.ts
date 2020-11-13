import { ContentChild, ContentChildren, Directive, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'd-tab',
    templateUrl: './d-tab.component.html'
})
export class DTabComponent implements OnInit {
    @Input() public title: string;
    @Input() public iconClass: string;
    @Input() public sectionClass = 'text-white bg-info';
    @Input() public padding = true;
    @Input() public showHeader = false;

    @ContentChild('tabHeader', { static: true }) headerTemplate: TemplateRef<any>;
    @ContentChild('tabTools', { static: true }) toolsTemplate: TemplateRef<any>;
    @ContentChild('tabSubTitle', { static: true }) subTitleTemplate: TemplateRef<any>;

    @ViewChild('innerTemplate') public innerTemplate: TemplateRef<any>;

    constructor() { }

    ngOnInit() { }
}