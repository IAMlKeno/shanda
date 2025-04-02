import { jobAttributes as Job } from "src/mvc/models";

export class JobDto {
  request: JobType;

  constructor(row: any) {
    this.request = row as Job;
  }
}
export interface JobType extends Job {}
export interface JobRequest extends Job {}