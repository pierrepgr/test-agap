import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="isError()" class="ui-messages-error">
      {{ text }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      color: red;
      font-style: italic;
      font-size: 11pt;
      white-space: nowrap;
    }
  `]
})
export class MessageComponent {

    @Input() error: string;
    @Input() control: FormControl;
    @Input() text: string;
  
    constructor() { }
    
    isError() {
      return this.control.hasError(this.error) && this.control.dirty;
    }
}
