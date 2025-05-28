import { SetMetadata } from '@nestjs/common';

export const INPUT_TYPE_KEY = 'inputType';

export const InputType = (args: { type: string, selectOptions?: {}, subtype?: string, additionalParams?: {} }): any => SetMetadata(INPUT_TYPE_KEY, args);

export type formArgs = { name: string, type: string, selectOptions?: {}, subtype?: string, additionalParams?: {} };
export const formDtoMap: Record<string, { formProperties?: {}, formFields: formArgs[] }> = {
  'user_registration': {
    formProperties: {},
    formFields: [
      { name: 'firstName', type: 'text', additionalParams: { label: 'First Name' } },
      { name: 'lastName', type: 'text', additionalParams: { label: 'Last Name' } },
      { name: 'email', type:'text', subtype: 'email', additionalParams: { label: 'Email' } }
    ]
  },
  // ... other form types and DTOs
};