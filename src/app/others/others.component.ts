import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
            email: ['', [Validators.required, Validators.email], this.checkValidEmail],
            optionA: new FormControl(false),
            optionB: new FormControl(false),
            optionBExtra: new FormControl({ disabled: true, value: '' }, [Validators.required, Validators.minLength(5)])           
        });

    }

    ngOnInit() {
         this.initOtherForm();
         // this.onChanges();
       
         this.optionB.valueChanges.subscribe(checked => {
           checked ? this.optionBExtra.enable() : this.optionBExtra.disable()
        });
    }

    get optionB() {
      return this.otherForm.get('optionB') as FormControl;
    }

    get optionBExtra() {
      return this.otherForm.get('optionBExtra') as FormControl;
    }

    checkValidEmail(control: AbstractControl) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'super@secret.com') {
              resolve({ emailIsTaken: true })
          } else {resolve(null)}
        }, 2000)
      })
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