import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {
  @Input() form: any;
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
  }

}
