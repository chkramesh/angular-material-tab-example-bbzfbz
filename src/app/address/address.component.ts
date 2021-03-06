import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})


export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  states: Array;
  countries: Array;
  disableSelect = new FormControl(false);
  disable: boolean = true;

 constructor(private formBuilder: FormBuilder) {
        this.countries = [{id: 'USA', name: 'United States'}, {id: 'UK', name: 'United Kingdom'}, {id: 'FR', name: 'France'}];
        this.states = [{ id: "AL", name: "Alabama" }, { id: "AK", name: "Alaska" }, { id: "AZ", name: "Arizona" }, { id: "AR", name: "Arkansas" }];
    }

    initAddressForm() {
        this.addressForm = this.formBuilder.group({
            firstName:[''], 
            addressLine1: ['', Validators.required],
            // addressLine2: [''],
            addressLine2:[{value: '', disabled: true}],
            city: ['', Validators.required],
            // state: ['', Validators.required],
            // state: [[{value: '', disabled: true}], Validators.required],
            state: [[{value: '', disabled: this.disable}], Validators.required],
            // state: [{value: '', disabled: this.disable}],
            postalCode: ['', Validators.required],
            country: ['', Validators.required],
            inputWorks: [''],
            selectNope: [{ value: '', disabled: this.disable }],
            // userCategory: ['employee'],
            userCategory: [{ value:'employee'}],
            institution: [null],
            company: [null, [Validators.required]],
            salary: [null, [Validators.required]],
        });
    }

     ngOnInit() {
       this.initAddressForm();
       this.onChanges();
       this.setUserCategoryValidators();
    }

// https://www.codementor.io/jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5
    // https://www.technouz.com/4725/disable-angular-reactiveform-input-based-selection/
    // https://stackoverflow.com/questions/51249891/mat-select-disabled-is-not-picking-up-on-the-variable-from-the-scope-in-angular5/51250091

    // Now use the power of Observables to watch for changes to the form. Essentially,
    // a subscription will be set up to execute a function every time the
    // value of Country is changed. 

    // The onChanges() function is simple. It gets the country control within
    // the addressForm and subscribes to any value changes. Whenever the value of the
    // Country field changes, the function is executed.
    onChanges() {
      console.log('onChanges');
      console.log('onChanges country = ' +  this.addressForm.get('country').value);
      console.log('onChanges state = ' +  this.addressForm.get('state').value);
      const addressLine2Control = this.addressForm.get('addressLine2');
      const stateControl = this.addressForm.controls['state'];

      stateControl.setValidators(null);
      stateControl.disable();      

      this.addressForm.get('country').valueChanges
      .subscribe(selectedCountry => {
          console.log('onChanges selectedCountry = ' +  selectedCountry);
          if (selectedCountry != 'USA') {
              console.log('onChanges selectedCountry state = ' +  this.addressForm.get('state'));
              this.addressForm.get('addressLine2').enable();

              // https://stackblitz.com/edit/angular-tdjobm?file=app%2Fapp.component.ts
              // below options are not working for select
              // this.addressForm.get('state').reset();
              // this.addressForm.get('state').disable();

              // below code working
              this.addressForm.controls['state'].reset();
              stateControl.disable();
              stateControl.setValidators(null);
          }
          else {
              this.addressForm.get('addressLine2').disable();
              this.addressForm.controls['state'].enable();
              stateControl.setValidators([Validators.required]);
              stateControl.updateValueAndValidity();
          }
      });

      this.addressForm.get('inputWorks').valueChanges
      .subscribe(inputWorksValue => {
          if (inputWorksValue.length <= 2) {
              // below code working
              this.addressForm.controls['selectNope'].reset();
              this.addressForm.controls['selectNope'].disable();
          }
          else {
              this.addressForm.controls['selectNope'].enable();
          }
      });
   }

   setUserCategoryValidators() {
    const institutionControl = this.addressForm.get('institution');
    const companyControl = this.addressForm.get('company');
    const salaryControl = this.addressForm.get('salary');
    const userCategoryControl = this.addressForm.get('userCategory');
    console.log('setUserCategoryValidators salaryControl = ' +  salaryControl);
    console.log('setUserCategoryValidators userCategoryControl = ' +  userCategoryControl);

    // this.addressForm.get('userCategory').valueChanges
    this.addressForm.get('userCategory').valueChanges
      .subscribe(userCategory => {

        console.log('setUserCategoryValidators userCategory = ' +  userCategory);
        if (userCategory === 'student') {
          institutionControl.setValidators([Validators.required]);
          companyControl.setValidators(null);
          salaryControl.setValidators(null);
        }

        if (userCategory === 'employee') {
          institutionControl.setValidators(null);
          companyControl.setValidators([Validators.required]);
          salaryControl.setValidators([Validators.required]);
        }

        institutionControl.updateValueAndValidity();
        companyControl.updateValueAndValidity();
        salaryControl.updateValueAndValidity();
      });
  }

   countryChange(event) {
    console.log('countryChange event = ' +event);
   } 

   stateChange(event) {
    console.log('stateChange event = ' +event);
   } 

}