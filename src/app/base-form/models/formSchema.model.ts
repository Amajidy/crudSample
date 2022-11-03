import {Validators} from "@angular/forms";

export interface FormSchema {
  type:     string;
  name:     string;
  label:    string;
  value?:   string;
  onUpload?: (e:Event) => void,
  validate: Array<Validators | any>
  options?: Option[];
}

interface Option {
  key:   string;
  label: string;
}
