export enum UserStatus { active = 'active', pending = 'pending', inactive = 'inactive' };
export enum JOB_STATUS { pending = 'pending', in_progress = 'in_progress', complete = 'complete' };
export enum Payment_Status { unpaid = 'unpaid', paid = 'paid', partially_paid = 'partially_paid' };
export enum PROFILE_STATUS { active = 'active', inactive = 'inactive' };
export enum PROFILE_TYPE { owner = 'owner', provider = 'provider', requester = 'requester' };
export enum REQUEST_STATUS { open = 'open', closed = 'closed', pending = 'pending' };
export enum BID_STATUS { accepted = 'accepted', rejected = 'rejected', open = 'open' };
export enum BOOKING_STATUS { pending = 'pending', complete = 'complete' };
export enum REQUEST_CATEGORY { service_request = 'service_request', part_request = 'part_request'};
export enum REQUEST_TAGS {
  mvi = 'mvi',
  tires = 'tires',
  oil_change = 'oil_change',
  detailing = 'detailing',
  keys = 'keys',
  parts = 'parts',
  maintenance = 'maintenance'
};

/**
 * Attempts to convert a string to a passed in enum type.
 * @param enumObj The enum to attampt to convert to
 * @param value The string value to convert
 * @returns
 */
export const convertStrToEnum = <T>(enumObj: { [key: string]: T }, value: string): T | undefined => {
    // Check if the value exists in the enum (handling both string keys and values)
    const enumValues = Object.values(enumObj);
    const enumKeys = Object.keys(enumObj).filter(key => isNaN(Number(key)));

    // Check if the value matches either a key or value in the enum
    if (enumKeys.includes(value)) {
        return enumObj[value as keyof typeof enumObj];
    } else if (enumValues.includes(value as unknown as T)) {
        return value as unknown as T;
    }

    return undefined;
}

export const createEnumList = <T>(enumObj: { [key: string]: T }, obj: any): Array<T> => {
  let list: Array<T> = [];
  Object.values(obj).map((value: any) => {
    list.push(convertStrToEnum<T>(enumObj, value));
  });
  return list;
}