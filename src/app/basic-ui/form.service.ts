import {Injectable} from '@angular/core';
import {EditControl} from "./edit-control";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) {
  }

  toFormGroup(editControls: EditControl[]): FormGroup {
    const group: any = {};
    editControls.forEach(editControl => {
      if (editControl.type === 'group') {
        group[editControl.name] = this.toFormGroup(editControl.children);
      } else if (editControl.type === 'array') {
        const validators = FormService.buildValidator(editControl);
        group[editControl.name] = this.formBuilder.array([], validators)
      } else {
        const validators = FormService.buildValidator(editControl);
        group[editControl.name] = this.formBuilder.control(undefined, validators);
      }

    });
    let formGroup = this.formBuilder.group(group);//  new FormGroup(group);
    editControls.forEach(ctrl => ctrl.formGroup = formGroup);
    return formGroup;
  }

  groupedControl(controls: EditControl[], groupName: string, filteredControl: EditControl[] = []): EditControl[] {
    controls.forEach(ctrl => {
      if (ctrl.type === 'group') {
        this.groupedControl(ctrl.children, groupName, filteredControl);
      } else if (ctrl.type === 'array') {

      } else if (ctrl.groupName === groupName) {
        filteredControl.push(ctrl)
      }
    });
    return filteredControl;
  }

  private static buildValidator(editControl: EditControl): any[] {
    let validators = [];
    if (editControl.isRequired) {
      validators.push(Validators.required);
    }
    if (editControl.isEmail) {
      validators.push(Validators.email);
    }
    if (editControl.pattern) {
      validators.push(Validators.pattern(editControl.pattern));
    }
    return validators;
  }
}
