import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  otherForm: FormGroup;
  states: Array;
  countries: Array;
  disableSelect = new FormControl(false);
  disable: boolean = true;

 constructor(private formBuilder: FormBuilder) {

        this.countries = [{id: 'USA', name: 'United States'}, {id: 'UK', name: 'United Kingdom'}, {id: 'FR', name: 'France'}];

        this.states = [{ id: "AL", name: "Alabama" }, { id: "AK", name: "Alaska" }, { id: "AZ", name: "Arizona" }, { id: "AR", name: "Arkansas" }];
    }

    initOtherForm() {
        this.otherForm = this.formBuilder.group({
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
       this.initOtherForm();
       this.onChanges();
    }

    onChanges() {
      console.log('onChanges');
      // console.log('onChanges country = ' +  this.addressForm.get('country').value);
      // console.log('onChanges state = ' +  this.addressForm.get('state').value);
      // const addressLine2Control = this.addressForm.get('addressLine2');
      // const stateControl = this.addressForm.controls['state'];

      // stateControl.setValidators(null);
      // stateControl.disable();      

      // this.addressForm.get('country').valueChanges
      // .subscribe(selectedCountry => {
      //     console.log('onChanges selectedCountry = ' +  selectedCountry);
      //     if (selectedCountry != 'USA') {
      //         console.log('onChanges selectedCountry state = ' +  this.addressForm.get('state'));
      //         this.addressForm.get('addressLine2').enable();

      //         // below code working
      //         this.addressForm.controls['state'].reset();
      //         stateControl.disable();
      //         stateControl.setValidators(null);
      //     }
      //     else {
      //         this.addressForm.get('addressLine2').disable();
      //         this.addressForm.controls['state'].enable();
      //         stateControl.setValidators([Validators.required]);
      //         stateControl.updateValueAndValidity();
      //     }
      // });
   }

  

}