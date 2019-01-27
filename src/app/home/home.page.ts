import { Component, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('phoneInput')
  public set phoneInput(value: IonInput) {
    console.log('value :', value);
    if (!value) {
      return;
    }

    value.getInputElement().then(input => this.registerTextMask(input));
  }

  public form: FormGroup = this.fb.group({
    phoneNumber: [null, [Validators.required]],
  });

  // prettier-ignore
  private phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  get phoneNumber() {
    return this.form.get('phoneNumber') as FormControl;
  }

  constructor(private fb: FormBuilder) {}

  private registerTextMask(inputElement: HTMLInputElement) {
    const maskedInput = createTextMaskInputElement({
      inputElement,
      mask: this.phoneMask,
      guide: false,
    });
    this.phoneNumber.valueChanges.subscribe(value => {
      maskedInput.update(value);
    });
  }
}
