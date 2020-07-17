import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-compoents-demo',
    templateUrl: 'components-demo.component.html'
})
export class ComponentsDemoComponent implements OnInit {

    selectedKey = 1;

    constructor() { }

    ngOnInit() { }
}
