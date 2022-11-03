import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as moment from 'jalali-moment';
import { BehaviorSubject, map, Observable, startWith, tap } from 'rxjs';
import { FormSchema } from 'src/app/base-form/models/formSchema.model';
import { GenderType, User } from 'src/app/models/user.model';
import cities from '../../cities/cities.json';
import states from '../../cities/states.json';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
})
export class CrudTableComponentView implements OnInit {
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}
  tableData!: Observable<User[]>;
  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.tableData = this.http.get<User[]>('api/users');
  }

  column = [
    {
      name: 'ردیف',
      col: 'id',
      sort: true,
    },
    {
      name: 'نام کاربری',
      col: 'username',
      sort: false,
    },
    {
      name: 'تاریخ تولد',
      col: 'birthday',
      sort: true,
    },
    {
      name: 'جنسیت',
      col: 'gender',
      sort: false,
    },
    {
      name: 'وضعیت',
      col: 'activity',
      sort: false,
    },
    {
      name: 'شهر',
      col: 'province',
      sort: false,
    },
  ];

  userDetail: any = this.fb.group({
    username: [, Validators.required],
    birthday: [, Validators.required],
    gender: [1, Validators.required],
    password: [, Validators.required],
    repassword: [, Validators.required],
    activity: [true, Validators.required],
    province: [, Validators.required],
    city: [, Validators.required],
  });

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  public fields: Array<FormSchema> = [
    {
      type: 'text',
      name: 'firstName',
      label: 'نام',
      value: '',
      validate: [Validators.required],
    },
    {
      type: 'date-picker',
      name: 'birthday',
      label: 'تاریخ تولد',
      value: '',
      validate: [],
    },
    {
      type: 'text',
      name: 'email',
      label: 'ایمیل',
      value: '',
      validate: [],
    },
    {
      type: 'password',
      name: 'password',
      label: 'رمز عبور',
      value: '',
      validate: [
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
        ),
      ],
    },
    // {
    //   type: 'dropdown',
    //   name: 'country',
    //   label: 'Country',
    //   value: 'in',
    //   validate: [],
    //   options: [
    //     { key: 'status', label: 'وضعیت' },
    //   ]
    // },
    {
      type: 'radio',
      name: 'country',
      label: 'Country',
      value: 'm',
      validate: [],
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' },
      ],
    },
    // {
    //   type: 'checkbox',
    //   name: 'hobby',
    //   label: 'Hobby',
    //   validate: [],
    //   options: [
    //     { key: 'f', label: 'Fishing' },
    //     { key: 'c', label: 'Cooking' }
    //   ]
    // }
  ];

  gender: any = {
    1: 'مرد',
    2: 'زن',
  };

  onUpload() {}

  editUser(item: User) {
    this.http.get<User>('api/users/' + item.id).subscribe((el: User) => {
      this.userDetail.patchValue({
        username: el.username,
        birthday: moment(el.birthday),
        gender: el.gender,
        province: el.province,
        city: el.city,
        activity: el.activity,
      });
      const dialogRef = this.dialog.open(UserDialog, {
        data: { form: this.userDetail, type: 'edit', id: el.id },
        width: '1000px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'done') {
          this.loadTable()
        }
      });
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserDialog, {
      data: { form: this.userDetail, type: 'add' },
    });
    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'done') {
        this.loadTable()
      }
    })
  }
}

@Component({
  selector: 'user-dialog',
  templateUrl: './user.dialog.html',
})
export class UserDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  userDetail = this.data.form;

  cityOptions!: Observable<any[]>;
  statesOptions!: Observable<any[]>;
  ngOnInit(): void {
    if (this.data.type === 'add') {
      this.userDetail.reset();
    }
    this.setStateOption()
    this.cityOptions = this.userDetail.get('province')?.valueChanges.pipe(
      startWith(''),
      map((el: any) => {
        this.states = states.states.filter((element: any) => element.province_id === el.id)
        this.setStateOption()
        return this._filterCity(el || '', this.cities)
      })
      )
  }
  setStateOption(){
    this.statesOptions = this.userDetail.get('city')?.valueChanges.pipe(
      startWith(""),
      map((el: any) => {
        if (!el) {
          this.states = states.states.filter((element: any) => element.province_id === this.userDetail.get('province')?.value?.id)
        }
        return this._filterCity(el || '', this.states)}),
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayFnCity(city?: any): string {
    return city ? city.name : undefined;
  }

  get checkPassword(): boolean {
    if (!!this.userDetail.get('password').value) {
      return (this.userDetail.get('password').value === this.userDetail.get('repassword').value);
    } else return false;
  }

  onSubmit() {
    this.userDetail.removeControl('repassword');
    let birth = this.userDetail.get('birthday').value;
    this.userDetail.patchValue({
      birthday: moment(birth).valueOf(),
    });
    let url = this.data.type === 'add' ? 'api/users' : 'api/users/' + this.data.id
    if (this.data.type === 'add') {
      this.http.post(url, this.userDetail.value).subscribe((el) => {
        this.dialogRef.close('done');
      });
    } else {
      this.http.put(url, this.userDetail.value).subscribe((el) => {
        this.dialogRef.close('done');
      });
    }
  }

  private _filterCity(value: string, arr: any[]) {
    return arr.filter((option: any) => option.name.includes(value));
  }

  states: Array<any> = states.states;
  cities = cities.cities;
  gender = GenderType;
  repassword!: string;
  key = Object.keys;

  persianGender: any = {
    MALE: 'مرد',
    FEMALE: 'زن',
  };
}
