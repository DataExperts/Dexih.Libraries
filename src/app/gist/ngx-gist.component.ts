import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-gist',
  templateUrl: './ngx-gist.component.html',
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class NgxGist implements AfterViewInit {
  @ViewChild('iframe') iframe:ElementRef;
  @Input() gistId;
  @Input() file:string;

  ngAfterViewInit() {
    const fileName = (this.file) ? this.file : '';
    this.iframe.nativeElement.id = 'gist-' + this.gistId;
    const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentElement.contentWindow;
    const content = `
        <html>
        <head>
          <base target="_parent">
        </head>
        <body onload="parent.document.getElementById('${this.iframe.nativeElement.id}')">
        <script type="text/javascript" src="https://gist.github.com/${this.gistId}.js?file=${fileName}"></script>
        </body>
      </html>
    `;
    doc.open();
    doc.write(content);
    doc.close();
  }
}