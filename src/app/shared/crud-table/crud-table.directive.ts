import { Directive, Input, TemplateRef, ContentChild } from '@angular/core';

@Directive({
  selector: '[crudTable]'
})
export class CrudTableDirective {
  @Input('crudTable') customField!: string;
  @ContentChild(TemplateRef) public columnTemplate!: TemplateRef<any>;
  constructor() {
  }

}
