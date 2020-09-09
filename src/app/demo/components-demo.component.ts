import { Component, OnInit, ViewChild } from '@angular/core';
import { DModalComponent, DToastComponent } from 'projects/components/src/lib';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-compoents-demo',
    templateUrl: 'components-demo.component.html'
})
export class ComponentsDemoComponent implements OnInit {
    @ViewChild('toasts', { static: true }) toasts: DToastComponent;
    @ViewChild('modal', { static: true }) modal: DModalComponent;
  
    selectedKey = 1;
    customCheckValue = 'checked';
    selectedTime = '10:15:30';

    modalConfirmValue: string;
    modalInformationValue: string;
    modalPromptValue = 'initial value';

    textControl = new FormControl();

    public timer;
    public percent = 0;

    constructor() { }

    ngOnInit() {
      this.textControl.setValue('the value');
    }

    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }

      public modalInformation() {
        this.modal.information('Information', 'This is a simple information dialog', 'Continue', 'You can include more information in this area').then(result => {
          this.modalInformationValue = 'ok';
        }).catch(() => this.modalInformationValue = 'should never happen');
      }

      public modalLarge() {
        const lines = Array.from(Array(1000).keys()).map(c => 'Line number ' + c);
        const info = lines.join('<br>');
        this.modal.information('Information', info, 'Continue', info).then(result => {
          this.modalInformationValue = 'ok';
        }).catch(() => this.modalInformationValue = 'should never happen');
      }

      public modalConfirm() {
        this.modal.confirm('Confirm', 'Do you want to do this <b>bold action<b>', 'Yes', 'Cancel').then(result => {
          this.modalConfirmValue = result ? 'confirmed' : 'cancelled';
        }).catch(() => this.modalConfirmValue = 'cancelled');
      }

      public modalPrompt() {
        this.modal.prompt('Prompt', 'Tell me something', 'Enter here:', this.modalPromptValue, 'Ok', 'Cancel').then(result => {
          this.modalPromptValue = result;
        }).catch(() => { /* cancel action here */ });
      }

      public startProgress() {
        this.timer = setInterval(() => {
          this.percent += 5;
          if (this.percent >= 100) {
            clearInterval(this.timer);
          }
        }, 250);
      }

      public stopProgress() {
        clearInterval(this.timer);
      }

      public resetProgress() {
        this.percent = 0;
      }
}
