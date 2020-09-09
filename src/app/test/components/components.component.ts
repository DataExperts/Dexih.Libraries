import { Component, ViewChild } from '@angular/core';
import { ToastMessage, DToastComponent, DModalComponent } from 'projects/components/src/public-api';
import { eDayOfWeek } from 'projects/components/src/lib/form-controls/form-daysofweek.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent {

  constructor(private fb: FormBuilder) {
  };
  @ViewChild('toasts', { static: true }) toasts: DToastComponent;
  @ViewChild('modal', { static: true }) modal: DModalComponent;
  
  public selectedItem0 = 0;

  public selectedItem: string;
  public textValue = 'text value';

  public multiSelectedItems = ['item1', 'test1'];
  public multiSelectedItems2 = [];
  public multiSelect = true;

  public multiSelect2 = 'item1';

  public selectedItem2 = 'text value';
  public textValue2: string = null;

  public selectedItem3: string = null;
  public textValue3 = 'static value';

  public selectedItem4: string = null;
  public textValue4 = 'the text';

  public selectedItem5 = 'cat2 item2';
  public textValue5: string = null;

  public selectedItem6 = 'item1';
  public textValue6: string = null;

  public selectedItem7 = 3;
  public textValue7: string = null;

  public selectedItem8 =  {key: 3, name: 'cat1 item2'};

  public nullableItem;
  
  // public selectedTags = [{key: 1, name: 'item1'}, {key: 3, name: 'item3'}];
  public selectedTags = [1, 3];

  public dynamicItems: string[] = null;

  public longItems = Array.from(Array(500).keys());

  public modalInformationValue: string;
  public modalConfirmValue: string;
  public modalPromptValue: string;

  public bodyWidth: number;
  public bodyHeight: number;

  public inputNumber = 0;
  public inputString = 'hi';

  public timeString = '10:20:30';

  public dateValue = '2000-01-01';
  public daysOfWeekValue = [eDayOfWeek.Monday, eDayOfWeek.Friday];

  public isRefreshing = false;
  public refreshItems = [];

  public timer;
  public percent = 0;

  public customCheckValue = 'checked';

  public formGroup: FormGroup;

  disabledControl = new FormControl({value: 'can not edit', disabled: true});

  public complexTags = [
    {column: {key: 1, name: 'col1', color: 'blue'}},
    {column: {key: 2, name: 'col2', color: 'red'}}
  ];

  public complexTagsSelected = [{column: {key: 1, name: 'col1'}}];

  public showMessage(message) {
    this.toasts.add(new ToastMessage('info', 'message', message, 5000));
  }

  public newFormGroup() {
    this.formGroup= new FormGroup({
      test: new FormControl({value: 'test', disabled: false}),
    });
  }

  public AddItems() {
      this.dynamicItems = ['item1', 'item2', 'item3'];
  }

  public close() {
    this.showMessage('close click');
  }

  public show(value: string) {
    this.showMessage(value);
  }

  public cancelled() {
    this.showMessage('cancelled');
  }

  public progress() {
    this.showMessage('progress');
  }

  public selectChange(value: string) {
    this.showMessage('selected - ' + value);
  }

  public resize($event) {
    this.bodyHeight = $event.height;
    this.bodyWidth = $event.width;
  }

  public addToasts() {
    this.toasts.add(new ToastMessage('success', 'Success', 'This is a success message', 7000));
    this.toasts.add(new ToastMessage('info', 'Information', 'This is a information message', 5000));
    this.toasts.add(new ToastMessage('error', 'Error', 'This is an error message', 6000));
    this.toasts.add(new ToastMessage('success', 'Huge', 'This message is huge ' + 'abc '.repeat(200), 7000));
    this.toasts.add({content: 'This one will never close an can be clicked and return 1',
      title: 'clicker', type: 'info', delay: -1,
      buttonName: 'click me', reference: '1', onButtonClick: (m) => this.toastClick(m) });
  }

  public addToast(type: 'success' | 'info' | 'error') {
    this.toasts.add(new ToastMessage(type, 'Toast', 'This is a ${type} message, that will last for 5 seconds', 5000));
  }

  public toastClick(message: ToastMessage) {
    alert('toast click with reference: ' + message.reference );
  }

  public modalInformation() {
    this.modal.information('Information', 'Some important info', 'Okey dokey', '<pre>a lot more information here...</pre>').then(result => {
      this.modalInformationValue = 'ok';
    }).catch(() => this.modalInformationValue = 'should never happen');
  }

  public modalConfirm() {
    this.modal.confirm('Confirm', 'Do you want to do this <b>bold test<b>', 'Do it', 'escape...').then(result => {
      this.modalConfirmValue = result ? 'confirmed' : 'cancelled';
    }).catch(() => this.modalConfirmValue = 'cancelled');
  }

  public modalConfirmTwice() {
    this.modalConfirm();
    this.modalConfirm();
  }


  public modalPrompt() {
    this.modal.prompt('Prompt', 'Tell me something', 'The Value:', 'save', 'quit').then(result => {
      this.modalPromptValue = result;
    }).catch(() => this.modalPromptValue = 'cancelled');
  }

  public openChange() {
    this.toasts.add(new ToastMessage('success', 'open/close changed',  null, 5000));
  }

  public opened() {
    this.toasts.add(new ToastMessage('success', 'Opened',  null, 5000));
  }

  public closed() {
    this.toasts.add(new ToastMessage('success', 'Closed',  null, 5000));
  }

  public onRefresh() {
    this.isRefreshing = true;

    setTimeout(() => {
      this.refreshItems = ['item1', 'item2', 'item3'];
      this.isRefreshing = false;
    }, 1000);
  }

  public startAnimateProgress() {

    this.timer = setInterval(() => {
      this.percent += 10;
      if (this.percent > 100) { this.percent = 0;}
    }, 1000);
  }

  public stopAnimateProgress() {
    clearInterval(this.timer);
  }

  public textValueChange($event) {
    this.toasts.add(new ToastMessage('success', 'text selected - ' + $event,  null));
  }
}

