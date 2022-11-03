import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import { BaseFormComponent } from './base-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import { FieldBuilderComponent } from './components/field-builder/field-builder.component';
import { TextboxComponent } from './components/items/textbox/textbox.component';
import { DatePickerComponent } from './components/items/date-picker/date-picker.component';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from '../shared/material.persian-date.adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CheckboxComponent } from './components/items/checkbox/checkbox.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RadioComponent } from './components/items/radio/radio.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    BaseFormComponent,
    FieldBuilderComponent,
    TextboxComponent,
    DatePickerComponent,
    CheckboxComponent,
    RadioComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    BaseFormComponent,
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ]
})
export class BaseFormModule { }
