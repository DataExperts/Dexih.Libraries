import { Component, OnInit } from '@angular/core';
import { Tag } from 'projects/table/src/lib';

class Characters {
    constructor(
        public character: string,
        public role: string,
        public actors: string[],
        public startDate: Date,
        public tags: string[],
        public image: string
    ) { }
}

class DataModel {
    constructor(
        public intValue: number,
        public stringValue: string,
        public footerValue: string,
        public headerValue: string,
        public dateValue: Date,
        public timeValue: Date,
        public boolValue: boolean,
        public codeValue: any,
        public jsonValue: any,
        public toolTip: string,
        public icon: string,
        public markdown: string,
        public markdownFooter: string,
        public charArray: string[],
        public childNodes: ChildModel[],
        public enumValue: eEnum,
        public tags: Tag[]
    ) { }
}

class ChildModel {
    constructor(
        public child1: string,
        public child2: string,
        public child3: string
    ) { }
}

enum eEnum {
    enum1,
    enum2,
    enum3
}

@Component({
    selector: 'app-table-demo',
    templateUrl: 'table-demo.component.html',
    preserveWhitespaces: true
})
export class TableDemoComponent implements OnInit {

    characters: Characters[] = [
        {character: 'Homer Simpson', role: 'Husband of Marge; father of Bart, Lisa, and Maggie.',
            actors: ['Dan Castellaneta'], startDate: new Date(1987, 0, 1), tags: ['male', 'adult'], image: 'assets/img/homer-simpson.png'},
        {character: 'Marge Simpson', role: 'Wife of Homer; mother of Bart, Lisa, and Maggie.',
            actors: ['Julie Kavner'], startDate: new Date(1987, 0, 1), tags: ['female', 'adult'], image: 'assets/img/marge-simpson.png'},
        {character: 'Bart Simpson', role: '	Oldest child and only son of Homer and Marge; brother of Lisa and Maggie.',
            actors: ['Nancy Cartwright'], startDate: new Date(1987, 0, 1), tags: ['male', 'child'], image: 'assets/img/bart-simpson.png'},
        {character: 'Lisa Simpson', role: 'Middle child and eldest daughter of Homer and Marge; sister of Bart and Maggie.',
            actors: ['Yeardley Smith'], startDate: new Date(1987, 0, 1), tags: ['female', 'child'], image: 'assets/img/lisa-simpson.png'},
        {character: 'Maggie Simpson', role: 'Husband of Marge; father of Bart, Lisa, and Maggie.',
            actors: ['Liz Georges', 'Gábor Csupó', 'Harry Shearer', 'Yeardley Smith', 'Nancy Cartwright', 'Elizabeth Taylor', 'James Earl Jones', 'Jodie Foster'], startDate: new Date(1987, 0, 1), tags: ['female', 'child'], image: 'assets/img/maggie-simpson.png'},
    ];

    characterFormat = [
        { name: '', image: 'image', title: 'Picture', format: 'Image' },
        { name: 'character', title: 'Character', format: '', footer: 'role', align: 'left', tagNames: 'tags' },
        { name: 'actors', title: 'Voice actor(s)', format: '', align: 'left' },
        { name: 'startDate', title: 'First Aired', format: 'Date' },
      ];

      formatTable = true;

      tags = [
        {color: 'blue', name: 'male'},
        {color: 'red', name: 'female'},
        {color: 'green', name: 'adult'},
        {color: 'orange', name: 'child'},
      ];

      columns = [
        { title: 'Icon', iconClass: 'icon', tooltip: 'toolTip', width: '1%', align: 'center' },
        { name: 'dateValue', title: 'Countdown', format: 'Countdown' },
        { name: 'dateValue', title: 'Calendar', format: 'Calendar' },
        { name: 'dateValue', title: 'Date/Time', format: 'DateTime' },
        { name: 'dateValue', title: 'Date', format: 'Date' },
        { name: 'timeValue', title: 'Time', format: 'Time' },
        { name: 'boolValue', title: 'Bool', format: 'Boolean' },
        { name: 'codeValue', title: 'Unformatted Html', format: 'Code' },
        { name: 'codeValue', title: 'Formatted Html', format: 'Html' },
        { name: 'jsonValue', title: 'Json', format: 'Json' },
        { name: 'markdown', title: 'Markdown', format: 'Md', footer: 'markdownFooter' },
        { name: 'charArray', title: 'Char[]', format: 'CharArray'},
        { name: 'childNodes', title: 'Node', format: 'Node', childColumns: [
          { name: 'child1', title: 'child1', format: '' },
          { name: 'child2', title: 'child2', format: '' },
          { name: 'child3', title: 'child3', format: '' },
        ]},
        { name: 'enumValue', title: 'Enum', format: 'Enum', enum: eEnum }
      ];

      date = new Date();

      childNodes = [new ChildModel('child1', 'child2', 'child3'), new ChildModel('r2child1', 'r2child2', 'r2child3')];

      simpleObject = {a: '1', b: '2', c: '3', d: {d1: '1', d2: '2'}};

      data: DataModel[] = [
        { intValue: 1, stringValue: 'row1', footerValue: 'row 1 footer',
        headerValue: 'row 1 header', dateValue: new Date(this.date.getTime() + 30000), timeValue: this.date,
        boolValue: true, codeValue: '<b>this is html</b>', jsonValue: this.simpleObject, toolTip: 'a tool tip 1',
        icon: 'fa fa-spin fa-cog', markdown: 'markdown **bold**', markdownFooter: 'footer **bold**', charArray: ['a', 'b', 'c'],
        childNodes: this.childNodes, enumValue: eEnum.enum1, tags: [this.tags[0], this.tags[1]]},
        { intValue: 2, stringValue: 'row2', footerValue: 'row 2 footer',
        headerValue: 'row 2 header', dateValue: new Date(this.date.getTime() + 30000), timeValue: this.date,
        boolValue: true, codeValue: '<b>bold 2</b>', jsonValue: this.simpleObject, toolTip: 'tip 2',
        icon: 'fa fa-spin fa-cog', markdown: 'markdown **bold**', markdownFooter: 'footer **bold**', charArray: ['a', 'b', 'c'],
        childNodes: this.childNodes, enumValue: eEnum.enum1, tags: [this.tags[0], this.tags[3]]},
      ]

      constructor() { }

    ngOnInit() { }

    public singleItem(item: DataModel) {
        window.alert('selected item: ' + item.intValue);
      }

      public multipleItems(items: DataModel[]) {
        window.alert('selected items: ' + items.map(c => c.intValue).join(', '));
      }
      scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
}
