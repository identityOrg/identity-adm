import {EditControl} from "../../../basic-ui/edit-control";

export const FormConfig = [
  new EditControl({name: 'username', label: 'Username', type: 'text', groupName: 'none'}),
  new EditControl({name: 'locked', label: 'Locked', type: 'text', groupName: 'none'}),
  new EditControl({name: 'active', label: 'Active', type: 'text', groupName: 'none'}),
  new EditControl({name: 'admin', label: 'Admin', type: 'text', groupName: 'none'}),
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
  new EditControl({
    name: 'userClaims', type: 'group', children: [
      new EditControl({name: 'name', label: 'Name', type: 'text', groupName: 'general'}),
      new EditControl({name: 'preferred_username', label: 'Preferred Username', type: 'text', groupName: 'general'}),
      new EditControl({
        name: 'given_name',
        groupName: 'profile',
        type: 'text',
        claimName: 'given_name',
        label: 'Given Name'
      }),
      new EditControl({
        name: 'family_name',
        groupName: 'profile',
        type: 'text',
        claimName: 'family_name',
        label: 'Family Name'
      }),
      new EditControl({
        name: 'middle_name',
        groupName: 'profile',
        type: 'text',
        claimName: 'middle_name',
        label: 'Middle Name'
      }),
      new EditControl({
        name: 'nickname',
        groupName: 'profile',
        type: 'text',
        claimName: 'nickname',
        label: 'Nickname'
      }),
      new EditControl({
        name: 'gender',
        groupName: 'profile',
        type: 'text',
        claimName: 'gender',
        label: 'Gender'
      }),
      new EditControl({
        name: 'birthdate',
        groupName: 'profile',
        type: 'date',
        claimName: 'birthdate',
        label: 'Birth Date'
      }),
      new EditControl({
        name: 'zoneinfo',
        groupName: 'profile',
        type: 'text',
        claimName: 'zoneinfo',
        label: 'Time Zone'
      }),
      new EditControl({
        name: 'locale',
        groupName: 'profile',
        type: 'text',
        claimName: 'locale',
        label: 'Locale'
      }),
      new EditControl({
        name: 'profile',
        groupName: 'profile',
        type: 'text',
        claimName: 'profile',
        label: 'Profile URL'
      }),
      new EditControl({
        name: 'picture',
        groupName: 'profile',
        type: 'text',
        claimName: 'picture',
        label: 'Profile Picture URL'
      }),
      new EditControl({
        name: 'website',
        groupName: 'profile',
        type: 'text',
        claimName: 'website',
        label: 'Website URL'
      }),
      new EditControl({
        name: 'address', type: 'group', children: [
          new EditControl({
            name: 'formatted',
            groupName: 'address',
            type: 'text',
            claimName: 'address.formatted',
            label: 'Formatted Address'
          }),
          new EditControl({
            name: 'street_address',
            groupName: 'address',
            type: 'text',
            claimName: 'address.street_address',
            label: 'Street Address'
          }),
          new EditControl({
            name: 'locality',
            groupName: 'address',
            type: 'text',
            claimName: 'address.locality',
            label: 'Locality'
          }),
          new EditControl({
            name: 'region',
            groupName: 'address',
            type: 'text',
            claimName: 'address.region',
            label: 'Region'
          }),
          new EditControl({
            name: 'postal_code',
            groupName: 'address',
            type: 'text',
            claimName: 'address.postal_code',
            label: 'Postal Code'
          }),
          new EditControl({
            name: 'country',
            groupName: 'address',
            type: 'text',
            claimName: 'address.country',
            label: 'Country'
          }),
        ]
      }),
      new EditControl({
        name: 'phone_number',
        groupName: 'communication',
        type: 'text',
        claimName: 'phone_number',
        label: 'Phone Number'
      }),
      new EditControl({
        name: 'phone_number_verified',
        groupName: 'communication',
        type: 'text',
        claimName: 'phone_number_verified',
        label: 'Phone Number Verified'
      }),
      new EditControl({
        name: 'email',
        groupName: 'communication',
        type: 'text',
        claimName: 'email',
        label: 'Email'
      }),
      new EditControl({
        name: 'email_verified',
        groupName: 'communication',
        type: 'text',
        claimName: 'email_verified',
        label: 'Email Verified'
      }),
    ]
  }),
];
