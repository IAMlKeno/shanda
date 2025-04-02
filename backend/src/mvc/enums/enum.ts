export enum UserStatus { active, pending, inactive };
export enum JOB_STATUS { pending, in_progress, complete };
export enum Payment_Status { unpaid, paid, partially_paid };
export enum PROFILE_STATUS { active, inactive };

export const convertStringToUserStatusEnum = (value: string) => UserStatus[value.toLowerCase()];
export const convertStringToJobStatusEnum = (value: string) => JOB_STATUS[value.toLowerCase()];
export const convertStringToPaymentStatusEnum = (value: string) => Payment_Status[value.toLowerCase()];