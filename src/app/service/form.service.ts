import {Injectable} from '@angular/core';
import {EditControl} from '../model/edit-control';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Claim} from '../model/claim';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) {
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

  toFormGroup(editControls: EditControl[]): FormGroup {
    const group: any = {};
    editControls.forEach(editControl => {
      if (editControl.type === 'group') {
        group[editControl.name] = this.toFormGroup(editControl.children);
      } else if (editControl.type === 'array') {
        const validators = FormService.buildValidator(editControl);
        group[editControl.name] = this.formBuilder.array([], validators);
      } else {
        const validators = FormService.buildValidator(editControl);
        group[editControl.name] = this.formBuilder.control(undefined, validators);
      }

    });
    let formGroup = this.formBuilder.group(group);//  new FormGroup(group);
    editControls.forEach(ctrl => ctrl.formGroup = formGroup);
    return formGroup;
  }

  addCustomUserAttributes(config: EditControl[], customAttributes: Claim[]): EditControl[] {
    if (customAttributes && customAttributes.length > 0) {
      let customElements: EditControl[] = customAttributes.map(claim => new EditControl({
        name: claim.standardAttribute,
        label: claim.description,
        type: 'text',
        groupName: 'custom'
      }));
      let userClaims = config.find(elm => elm.name === 'userClaims');
      if (userClaims) {
        userClaims.children.push(...customElements);
      }
    }
    return config;
  }

  groupedControl(controls: EditControl[], groupName: string, filteredControl: EditControl[] = []): EditControl[] {
    controls.forEach(ctrl => {
      if (ctrl.type === 'group') {
        this.groupedControl(ctrl.children, groupName, filteredControl);
      } else if (ctrl.type === 'array') {

      } else if (ctrl.groupName === groupName) {
        filteredControl.push(ctrl);
      }
    });
    return filteredControl;
  }
}
