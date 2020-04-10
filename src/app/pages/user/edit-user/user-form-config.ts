import {EditControl} from "../../../basic-ui/edit-control";

export const FormConfig = [
  new EditControl({name: 'name', label: 'Name', type: 'text', isReadonly: true, groupName: 'general'}),
  new EditControl({name: 'preferred_username', label: 'Preferred Username', type: 'text', groupName: 'general'}),
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
    claimName: 'password_expiry_date'
  }),
  new EditControl({
    name: 'userClaims', type: 'group', children: [
      new EditControl({
        name: 'given_name',
        groupName: 'profile',
        type: 'text',
        claimName: 'given_name',
        label: 'Given Name'
      }),
    ]
  }),
];
