import { Component, ViewChild, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
import { ToastMessage, DToastComponent, DModalComponent } from 'projects/components/src/public-api';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tag } from 'projects/table/src/lib/d-table.models';

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
    public percentValue: any,
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
  ) {}
}

enum eEnum {
  enum1,
  enum2,
  enum3
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  title: string;

  columns = [
    { title: 'Icon', iconClass: 'icon', tooltip: 'toolTip', width: '1%', align: 'center' },
    { name: 'intValue', title: 'Int', format: '' },
    { name: 'stringValue', title: 'String', format: '', footer: 'footerValue', header: 'headerValue', tags: 'tags' },
    { name: 'dateValue', title: 'Countdown', format: 'Countdown' },
    { name: 'dateValue', title: 'Calendar', format: 'Calendar' },
    { name: 'dateValue', title: 'Date/Time', format: 'DateTime' },
    { name: 'dateValue', title: 'Date', format: 'Date' },
    { name: 'timeValue', title: 'Time', format: 'Time' },
    { name: 'boolValue', title: 'Bool', format: 'Boolean' },
    { name: 'codeValue', title: 'Code', format: 'Code' },
    { name: 'codeValue', title: 'Html', format: 'Html' },
    { name: 'jsonValue', title: 'Json', format: 'Json' },
    { name: 'markdown', title: 'Markdown', format: 'Md', footer: 'markdownFooter' },
    { name: 'charArray', title: 'Char Array', format: 'CharArray'},
    { name: 'percentValue', title: 'Sortable Percent' },
    { name: 'childNodes', title: 'Node', format: 'Node', childColumns: [
      { name: 'child1', title: 'child1', format: '' },
      { name: 'child2', title: 'child2', format: '' },
      { name: 'child3', title: 'child3', format: '' },
    ]},
    { name: 'enumValue', title: 'Enum', format: 'Enum', enum: eEnum }
  ];

  mdColumns = [
    { title: 'Icon', iconClass: 'icon', tooltip: 'toolTip', width: '1%', align: 'center' },
    { name: 'markdown', title: 'Markdown', format: 'Md', footer: 'markdownFooter', tags: 'tags' },
    { name: 'enumValue', title: 'Enum', format: 'Enum', enum: eEnum }
  ];

  singleColumn = [
    { name: 'intValue', title: 'Int', format: '' }
  ]

  tags = [
    {color: 'blue', name: 'blue'},
    {color: 'red', name: 'red'},
    {color: 'green', name: 'green'},
    {color: 'white', name: 'white'},
    {color: 'yellow', name: 'yellow'},
    {color: 'black', name: 'black'},
  ];

  largeColumns = [
    { title: 'row', tooltip: 'toolTip', width: '1%', align: 'center' },
    { name: 'markdown', title: 'Markdown', format: 'Md', footer: 'markdownFooter', tags: 'tags' },
    { name: 'enumValue', title: 'Enum', format: 'Enum', enum: eEnum }
  ];

  public tableData = new BehaviorSubject<Array<DataModel>>(null);
  // tableData: Observable<Array<DataModel>> = this.tableData.asObservable();

  public dataEmpty: string[] = [];
  public delayedData: any[] = null;
  public oneRow: any[] = [];

  public arrayData = new BehaviorSubject<string[][]>(null);
  // arrayData: Observable<string[][]> = this.arrayData.asObservable();
  public arrayColumns: Array<any>;

  public largeData: Array<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.arrayColumns = [
      { name: 0, title: 'col1' },
      { name: 1, title: 'col2' },
      { name: 2, title: 'col3' },
    ];

    const arrayData = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
    this.arrayData.next(arrayData);

    this.oneRow = [{ name: 0, title: 'col1' }];

    const date = new Date();

    const childNodes = [new ChildModel('child1', 'child2', 'child3'), new ChildModel('r2child1', 'r2child2', 'r2child3')];

    const simpleObject = {a: '1', b: '2', c: '3', d: {d1: '1', d2: '2'}};

    const data = new Array<DataModel>();
    data.push(new DataModel(1, 'row3', 'row 1 footer', 'row 1 header', new Date(date.getTime() + 30000), date,
      true, '<b>bold 1</b>', simpleObject, 'tip 1', 'fa fa-spin fa-cog', 'markdown **bold**', 'footer **bold**', ['a', 'b', 'c'],
      {f: '5%', r: '0.05'}, childNodes, eEnum.enum1, [this.tags[0], this.tags[1]]));
    data.push(new DataModel(2, 'row2', 'row 2 footer', 'row 2 header', new Date(date.getTime() + 300000), date,
      true, '<b>bold 1</b>', simpleObject, 'tip 2', 'fa fa-spin fa-cog',
      null, null, ['a', 'b', 'c'], {f: '0%'}, childNodes, eEnum.enum2, [this.tags[0]]));
    data.push(new DataModel(3, 'row1', 'row 3 footer', 'row 3 header',  new Date(date.getTime() + 3000000), date,
      true, '<b>bold 1</b>', JSON.stringify(simpleObject), 'tip 3', 'fa fa-spin fa-cog', 'markdown **bold 2** [link](http://google.com)',
        'footer2 **bold** [link](http://google.com)', ['a', 'b', 'c'], {f: '15%', r: '0.15'}, childNodes, eEnum.enum3, null));

    this.tableData.next(data);

    this.largeData = new Array(10000);
    for (let i = 0; i < 10000; i++) {
      this.largeData[i] = new DataModel(i, `row ${i}`, 'row 1 footer', 'row 1 header', new Date(date.getTime() + 30000), date,
      true, '<b>bold 1</b>', simpleObject, 'tip 1', 'fa fa-spin fa-cog', 'markdown **bold**', 'footer **bold**', ['a', 'b', 'c'],
      {f: i/100 + '%', r: i/10000},
      childNodes, eEnum.enum1, [this.tags[0], this.tags[1]]);
    }

    setTimeout(() => {
        this.delayedData = [];

        setTimeout(() => {
          this.delayedData = data;
        }, 5000);
    }, 5000);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  public selectedItems(items: Array<DataModel>) {
    window.alert('selected ' + items.map(c => c.intValue).join(', ') );
  }

  public selectedItem(item: DataModel) {
    window.alert('selected ' + item.intValue);
  }

  public tagClick(tag: Tag) {
    window.alert('tag clicked: ' + tag.name);
  }

  dropped(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      alert('ISSUE: same container');
    } else {
      alert(`insert row: ${event.currentIndex} data: ${event.previousContainer.data}`);
    }
  }
}
