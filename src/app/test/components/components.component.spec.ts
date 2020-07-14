import { TestBed, async } from '@angular/core/testing';
import { ComponentsComponent } from './components.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ComponentsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ComponentsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Libraries'`, () => {
    const fixture = TestBed.createComponent(ComponentsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Libraries');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(ComponentsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Libraries!');
  });
});
