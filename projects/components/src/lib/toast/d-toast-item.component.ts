import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastMessage} from './d-toast.models';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
    selector: 'd-toast-item',
    templateUrl: './d-toast-item.component.html',
    styleUrls: ['./d-toast-item.component.scss' ],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ height: '0px', 'opacity': 0 }),
                animate('0.5s ease', style({ 'height': 'auto', 'opacity': 1 })),
            ]),
            transition(':leave', [
                animate('0.5s ease', style({ 'height': '0px', 'opacity': 0 })),
            ])
        ]),
      ]
})
export class DToastItemComponent implements OnInit {
    @Input() message: ToastMessage;
    @Output() onDestroy: EventEmitter<DToastItemComponent> = new EventEmitter<DToastItemComponent>();

    public show = false;
    public content: string;

    constructor() { }

    ngOnInit() {
        this.show = true;

        if (this.message) {
            if (this.message.content && this.message.content.length > 200) {
                this.content = this.message.content.substr(0, 200) + ' ...';
            } else {
                this.content = this.message.content;
            }
        }

        if (this.message.delay > 0) {
            setTimeout(() => this.destroy(), this.message.delay);
        }
    }

    public destroy(): void {
        this.show = false;
    }

    public animationDone(): void {
        if (!this.show) {
            this.onDestroy.emit();
        }
    }

    close() {
        this.destroy();
    }

    onButtonClick() {
        if (this.message.onButtonClick) {
            this.destroy();
            this.message.onButtonClick(this.message);
        }
    }
}
