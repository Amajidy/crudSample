import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef, ContentChild, OnInit } from '@angular/core';
import { CrudTableDirective } from './crud-table.directive';

@Component({
  selector: 'crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements AfterContentInit, OnInit {
  @Input() data: any
  @Input() column: any

  header:any = []


  @ContentChildren(CrudTableDirective) customField !: QueryList<CrudTableDirective>;

  constructor() { }
  ngOnInit(): void {
    this.header = [
    ...this.column,
    {
      name: 'عملیات',
      sort: false,
      col: 'action'
    }
  ]
  }

  @ContentChild(TemplateRef) template !: TemplateRef<any>
  @ContentChildren(TemplateRef) templateref !: QueryList<TemplateRef<any>>

  get columnTemplates(): { [key: string]: TemplateRef<any> } {
    if (this.customField != null) {
      const columnTemplates: { [key: string]: TemplateRef<any> } = {};
      for (const columnDefinition of this.customField.toArray()) {
        columnTemplates[columnDefinition.customField] = columnDefinition.columnTemplate;
      }
      return columnTemplates;
    } else {
      return {};
    }
  }

  checkCustomField():string[]{
    return this.column.map((el:any) => el.col)
  }

  ngAfterContentInit(): void {
    for (const columnDefinition of this.customField.toArray()) {
      this.columnTemplates[columnDefinition.customField] = columnDefinition.columnTemplate;
    }
  }

  public onCellClick(e: any, options?: any) {
    console.log(this.customField);
  }

}
