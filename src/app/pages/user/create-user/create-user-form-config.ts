import {EditControl} from '../../../model/edit-control';
import {CommonUserProfileFormConfig} from '../user-profile-form-config';

export const CreateFormConfig = [
  new EditControl({name: 'username', label: 'Username', type: 'text', groupName: 'general', isRequired: true}),
  new EditControl({name: 'locked', label: 'Locked', type: 'yes-no', groupName: 'general'}),
  new EditControl({name: 'active', label: 'Active', type: 'yes-no', groupName: 'none'}),
  new EditControl({name: 'admin', label: 'Admin', type: 'yes-no', groupName: 'general'}),
  new EditControl({name: 'passwordExpiryDate', label: 'Password Expiry Date', type: 'text', groupName: 'none'}),
  new EditControl({
    name: 'expiryDate',
    label: 'Expires On',
    type: 'date',
    claimName: 'expiry_date',
    groupName: 'general'
  }),
  new EditControl({
    name: 'passwordExpiryDate',
    label: 'Password Expires On',
    type: 'date',
    claimName: 'password_expiry_date',
    groupName: 'none'
  }),
  CommonUserProfileFormConfig,
];
