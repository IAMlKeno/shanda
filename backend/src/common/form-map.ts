import { SetMetadata } from '@nestjs/common';
import { REQUEST_CATEGORY, REQUEST_TAGS } from 'src/mvc/enums/enum';

export const INPUT_TYPE_KEY = 'inputType';

export const InputType = (args: { type: string, selectOptions?: {}, subtype?: string, additionalParams?: {} }): any => SetMetadata(INPUT_TYPE_KEY, args);

export type formArgs = { name: string, type: string, selectOptions?: {}, subtype?: string, additionalParams?: {} };
export const formDtoMap: Record<string, { formProperties?: {}, formFields: formArgs[] }> = {
  'user_registration': {
    formProperties: {},
    formFields: [
      { name: 'firstName', type: 'text', additionalParams: { label: 'First Name' } },
      { name: 'lastName', type: 'text', additionalParams: { label: 'Last Name' } },
      { name: 'username', type: 'text', additionalParams: { label: 'Username' } },
      { name: 'email', type:'text', subtype: 'email', additionalParams: { label: 'Email' } },
      { name: 'phone', type:'text', subtype: 'phone', additionalParams: { label: 'Phone' } },
    ]
  },
  'request': {
    formProperties: {},
    formFields: [
      { name: 'summary', type: 'text', additionalParams: { label: 'Summary' } },
      { name: 'description', type: 'textarea', additionalParams: { label: 'Description' } },
      { name: 'vehicleId', type: 'text', additionalParams: { label: 'Vehicle' } },
      { name: 'request-type', type:'select', additionalParams: { label: 'Email', options: Object.entries(REQUEST_TAGS), multiple: 'multiple' } },
      { name: 'request-category', type:'select', additionalParams: { label: 'Phone', options: Object.entries(REQUEST_CATEGORY) } },
    ]
  },
  'vehicle': {
    formProperties: {},
    formFields: [
      { name: 'make', type: 'select', additionalParams: { label: 'Make', options: [ ['honda', 'Honda'], [ 'toyota', 'Toyota']] } },
      { name: 'trim', type: 'input', additionalParams: { label: 'Trim' } },
      { name: 'year', type: 'text', additionalParams: { label: 'Year' } },
      { name: 'color', type:'select', additionalParams: { label: 'Color', options: [ ['black', 'Black'], ['red', 'Red'] ] } },
      { name: 'model', type:'select', additionalParams: { label: 'Model' } },
      { name: 'mileage', type:'input', additionalParams: { label: 'Mileage' } },
    ]
  },
  // ... other form types and DTOs
};