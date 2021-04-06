import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
  <p class="text-danger">
    {{errorMessage}}
  </p>
  `,
  styleUrls: ['./form-field-error.component.sass']
})
export class FormFieldErrorComponent implements OnInit {

  // tslint:disable: no-input-rename
  @Input('form-control') formControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'dado obrigatório';
    } else if (this.formControl.errors.minlength) {
      const reqLength = this.formControl.errors.minlength.requiredLength;
      return `deve ter no minimo ${reqLength} caracteres`;
    } else if (this.formControl.errors.maxlength) {
      const reqLength = this.formControl.errors.maxlength.requiredLength;
      return `deve ter no maximo ${reqLength} caracteres`;
    } else if (this.formControl.errors.email) {
      return 'formato de email invalido';
    }
  }

  private mustShowErrorMessage() {
    return this.formControl.invalid && this.formControl.touched;
  }

}
