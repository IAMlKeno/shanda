import { v4 as guid } from "uuid";

export function getRandomUuid(): string {
  return guid();
}