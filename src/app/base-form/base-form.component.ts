import {Component, Input, OnInit} from '@angular/core';
import {FormSchema} from "./models/formSchema.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  @Input() formSchema!:Array<FormSchema>
  form !:FormGroup
  constructor() { }

  ngOnInit(): void {
    this.createReactiveForm()
  }

  createReactiveForm(){
    let fieldName:any = {}
    for (const formSchema of this.formSchema) {
      // if (formSchema.type !== 'radio'){
        fieldName[formSchema.name] = new FormControl(formSchema.value || '', formSchema.validate )
      // } 
      // else {
      //   let opts:any = {}
      //   // @ts-ignore
      //   for (const opt of formSchema.options) {
      //     opts[opt.key] = new FormControl(false)
      //   }
      //   console.log(opts);
      //   fieldName[formSchema.name] = new FormGroup(opts)
      // }
    }
    this.form = new FormGroup(fieldName)
    console.log(this.form);
  }
  onSubmit(){
    console.log(this.form)
  }
}
