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
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [{ value: 'a', disabled: true }],
      street: [''],
      zip: [''],
    });
  }

  ngOnInit() {
    this.form.patchValue({
      name: 'name',
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



// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }