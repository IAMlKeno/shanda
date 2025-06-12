export enum UserStatus { active = 'active', pending = 'pending', inactive = 'inactive' };
export enum JOB_STATUS { pending = 'pending', in_progress = 'in_progress', complete = 'complete' };
export enum Payment_Status { unpaid = 'unpaid', paid = 'paid', partially_paid = 'partially_paid' };
export enum PROFILE_STATUS { active = 'active', inactive = 'inactive' };
export enum PROFILE_TYPE { owner = 'owner', provider = 'provider', requester = 'requester' };
export enum REQUEST_STATUS { open = 'open', closed = 'closed', pending = 'pending' };
export enum BID_STATUS { accepted = 'accepted', rejected = 'rejected', open = 'open' };
export enum BOOKING_STATUS { pending = 'pending', complete = 'complete' };


export const convertStringToUserStatusEnum = (value: string) => value.toLowerCase() as unknown as UserStatus;
export const convertStringToJobStatusEnum = (value: string) => value.toLowerCase() as unknown as JOB_STATUS;
export const convertStringToPaymentStatusEnum = (value: string) => Payment_Status[value.toLowerCase()];

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