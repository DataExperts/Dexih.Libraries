import { Component, ViewChild } from '@angular/core';
import { ToastMessage, DexihToastComponent, DexihModalComponent } from '../../../projects/components/src/public-api';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent {
  @ViewChild('toasts', { static: true }) toasts: DexihToastComponent;
  @ViewChild('modal', { static: true }) modal: DexihModalComponent;

  public selectedItem0 = 0;

  public selectedItem: string;
  public textValue = 'text value';

  public selectedItem2 = 1;
  public textValue2: string = null;

  public selectedItem3: string = null;
  public textValue3 = 'static value';

  public selectedItem4: string = null;
  public textValue4 = 'the text';

  public selectedItem5 = 'cat2 item2';
  public textValue5: string = null;

  public selectedItem6 = "item1";
  public textValue6: string = null;

  public selectedItem7 = 3;
  public textValue7: string = null;

  public selectedItem8 =  {key: 3, name: 'cat1 item2'};

  // public selectedTags = [{key: 1, name: 'item1'}, {key: 3, name: 'item3'}];
  public selectedTags = [1, 3];

  public dynamicItems: string[] = null;

  public modalInformationValue: string;
  public modalConfirmValue: string;
  public modalPromptValue: string;

  public bodyWidth: number;
  public bodyHeight: number;

  public AddItems() {
      this.dynamicItems = ['item1', 'item2', 'item3'];
  }

  public close() {
    alert('close click');
  }

  public show(value: string) {
    alert(value);
  }

  public cancelled() {
    alert('cancelled');
  }

  public progress() {
    alert('progress');
  }

  public selectChange(value: string) {
    alert('selected - ' + value);
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
    this.modal.information('Information', 'Some important info', 'Okey dokey').then(result => {
      this.modalInformationValue = 'ok';
    }).catch(() => this.modalInformationValue = 'should never happen');
  }

  public modalConfirm() {
    this.modal.confirm('Confirm', 'Do you want to do this <b>bold test<b>', 'Do it', 'escape...').then(result => {
      this.modalConfirmValue = 'confirmed';
    }).catch(() => this.modalConfirmValue = 'cancelled');
  }

  public modalPrompt() {
    this.modal.prompt('Prompt', 'Tell me something', 'The Value:', 'save', 'quit').then(result => {
      this.modalPromptValue = result;
    }).catch(() => this.modalPromptValue = 'cancelled');
  }

  public openChange() {
    window.alert('open/close changed');
  }
}

