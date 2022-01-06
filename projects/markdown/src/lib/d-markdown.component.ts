import { Component, Input, 
    ElementRef,
    Output,
    EventEmitter,
    Inject,
    PLATFORM_ID,
    SecurityContext,
    AfterViewInit} from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Subscribable, Observable, ObservableInput } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Renderer, parse } from 'marked';
import * as Prism from 'prismjs';

@Component({
    selector: 'markdown, [markdown]',
    template: '<ng-content></ng-content>',
})
export class DMarkdownComponent implements AfterViewInit {
    @Input()
    set path(value: string) {
      if (value) {
        this._path = value;
        this.onPathChange();
      }
    }
  
    @Input()
    set data(value: string) {
      if (value) {
        this._data = value;
        this.onDataChange(value);
      }
    }

    /**
     * Boolean indicating if the markdown content should be sanitized to avoid script injections
     */
    @Input() public sanitizeHtml = true;

    @Output() error: EventEmitter<any> = new EventEmitter<any>();
    @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

    _path: string;
    _data: string;
    _md: any;
    _ext: string;
    changeLog: string[] = [];

    constructor(
        private _domSanitizer: DomSanitizer,
        private _http: HttpClient,
        public _el: ElementRef,
      @Inject(PLATFORM_ID) public platformId: string
    ) {}

    
    ngAfterViewInit() {
      if (this._path) {
        this.onPathChange();
      } else if (!this._data) {
        this.processRaw();
      }
    }
  
    // on input
    onDataChange(data: string) {
      if (data) {
        this._el.nativeElement.innerHTML = this.compile(
          data,
          this.sanitizeHtml
        );
      } else {
        this._el.nativeElement.innerHTML = '';
      }
      this.highlightContent(false);
    }
  
    processRaw() {
      this._md = this.prepare(this.decodeHtml(this._el.nativeElement.innerHTML));
      this._el.nativeElement.innerHTML = this.compile(
        this._md,
        this.sanitizeHtml
      );
      this.highlightContent(false);
    }
  
    /**
     * get remote content;
     */
    onPathChange() {
      this._ext = this._path && this._path.split('.').splice(-1).join();

      this.getContent(this._path)
        .pipe(catchError(this.handleError))
        .subscribe(data => {
          this.loaded.emit(data);
          this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
          
          this._el.nativeElement.innerHTML = this.compile(
            this.prepare(this._md),
            this.sanitizeHtml
          );
          this.highlightContent(false);
        });
    }
  
    // get the content from remote resource
  getContent(path: string): Observable<any> {
    return this._http.get(path, { responseType: 'text' }).pipe(
      map(res => this.extractData(res)),
      catchError(this.handleError)
    );
  }

  public get renderer(): Renderer {
    return new Renderer();
  }

  // handle data
  public extractData(res: any): string {
    return res || '';
  }

  /**
   * catch http error
   */
  private handleError(error: any, caught: Observable<any>): ObservableInput<any> {
    this.error.emit(error);
    console.error('An error occurred', error); // for demo purposes only
    return error.message || error;
  }
  
    /**
     * Prepare string
     */
    prepare(raw: string) {
      if (!raw) {
        return '';
      }
      if (this._ext === 'md' || !this.path) {
        let isCodeBlock = false;
        return raw
          .split('\n')
          .map((line: string) => {
            // If the first non-blank chars are an opening/closing code block, toggle the flag
            if (this.trimLeft(line).substring(0, 3) === '```') {
              isCodeBlock = !isCodeBlock;
            }
            return isCodeBlock ? line : line.trim();
          })
          .join('\n');
      }
      return raw.replace(/\"/g, '\'');
    }
  
    /**
     * Trim left whitespace
     */
    private trimLeft(line: string) {
      return line.replace(/^\s+|\s+$/g, '');
    }
  
    /**
     * Use Prism to highlight code snippets only on the browser
     */
    private highlightContent(async: boolean): void {
      if (isPlatformBrowser(this.platformId)) {
        Prism.highlightAll(async);
      }
    }

      // compile markdown to html
    public compile(data: string, sanitize = true) {
        return this._domSanitizer.sanitize(
        sanitize ? SecurityContext.HTML : SecurityContext.NONE,
        parse(data).trim()
        );
    }

    private decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
}
