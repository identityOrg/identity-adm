import {FormGroup} from '@angular/forms';

export class EditControl {
  name: string;
  type: string;
  label: string;
  isReadonly: boolean;
  isRequired: boolean;
  isEmail: boolean;
  isUrl: boolean;
  pattern: RegExp;
  children: Array<EditControl>;
  hint: string;
  claimName: string;
  groupName: string;
  formGroup: FormGroup;

  constructor(option: {
    name?: string;
    type?: string;
    label?: string;
    isReadonly?: boolean;
    isRequired?: boolean;
    isEmail?: boolean;
    isUrl?: boolean;
    pattern?: RegExp;
    children?: Array<EditControl>;
    hint?: string;
    claimName?: string;
    groupName?: string;
  } = {}) {
    this.name = option.name || '';
    this.type = option.type || '';
    this.label = option.label || '';
    this.isReadonly = !!option.isReadonly;
    this.isRequired = !!option.isRequired;
    this.isEmail = !!option.isEmail;
    this.isUrl = !!option.isUrl;
    this.pattern = option.pattern;
    this.children = option.children;
    this.hint = option.hint;
    this.claimName = option.claimName;
    this.groupName = option.groupName || '';
  }
}
