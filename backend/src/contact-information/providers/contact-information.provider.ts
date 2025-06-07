import { contactInformation } from "src/mvc/models";

export const contactInfoProviders = [
  {
    provide: 'CONTACT_INFO_REPOSITORY',
    useValue: contactInformation,
  },
];