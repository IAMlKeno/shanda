import { accountMapping } from "src/mvc/models/accountMapping";

export const accountMappingProviders = [
  {
    provide: 'ACCOUNTMAPPING_INFO_REPOSITORY',
    useValue: accountMapping,
  },
];