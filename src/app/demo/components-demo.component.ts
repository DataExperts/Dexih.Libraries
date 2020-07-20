import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-compoents-demo',
    templateUrl: 'components-demo.component.html'
})
export class ComponentsDemoComponent implements OnInit {

    selectedKey = 1;
    customCheckValue = 'checked';
    selectedTime = '10:15:30';

    constructor() { }

    ngOnInit() { }

    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
}
