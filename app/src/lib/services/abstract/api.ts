import { read } from "$app/server";
import type { Feature } from "$lib/models/feature";
import type { Idea } from "$lib/models/idea";
import { parse } from "csv/sync";
// import { parse as csvParser } from "csv";
import * as fs from 'node:fs/promises';

abstract class IMindGameApi {
  constructor() { }

  abstract getIdeas(): Promise<Idea[]> ;
  abstract getFeaturesByIdeaId(): Feature[];
  abstract getFeatureById(): Feature;
  abstract createIdea(): void;
}

export class LocalFileDatabaseApi extends IMindGameApi {
  async getIdeas(): Promise<Idea[]> {
    const a = await fs.readFile(`./data.csv`);
    const result: Array<any> = parse(a);
    var ideas: Idea[] = [];
    result.forEach((value, idx) => {
      if (idx == 0 || value[1] == 'feature') return;

      const obj = {title: value[2], field_description: value[3]} as Idea;
      ideas.push(obj);
    });

    return ideas;
  }
  getFeaturesByIdeaId(): Feature[] {
    throw new Error("Method not implemented.");
  }
  getFeatureById(): Feature {
    throw new Error("Method not implemented.");
  }
  createIdea(): void {
    throw new Error("Method not implemented.");
  }
  
}

export class DrupalDatabaseApi extends IMindGameApi {
  baseUrl: string;

  constructor() {
    super();
    this.baseUrl = import.meta.env.VITE_API;
  };

  async getIdeas(): Promise<Idea[]> {
    try {
      console.log(`api: ${this.baseUrl}`);
      const res = await fetch(`${this.baseUrl}/api/mindgames`);
      return await res.json();
    }
    catch(e) {
      console.log(e);
      throw new Error(`ERROR encountered ${e}`);
    }
  }
  getFeaturesByIdeaId(): Feature[]{
    throw new Error("Method not implemented.");
  }
  getFeatureById(): Feature {
    throw new Error("Method not implemented.");
  }
  createIdea(): void {
    throw new Error("Method not implemented.");
  }

}

export function getApiService(): IMindGameApi {
  var api: IMindGameApi;
  switch("drupall") {
    case "drupal":
      api = new DrupalDatabaseApi();
      break;
    default:
      api = new LocalFileDatabaseApi();
  }

  return api;
}
