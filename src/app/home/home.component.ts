import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  disableTextbox =  false;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [{ value: '', disabled: true }],
      street: [''],
      zip: [''],
    });
  }

  ngOnInit() {
    this.form.patchValue({
      firstName: 'First name',
      lastName: 'Last Name'
    });

    // this.form.disable();
  }

  update() {
    console.log(this.form.value);

    this.disableTextbox = !this.disableTextbox;
    // this.disableTextbox = true;;
  }

}