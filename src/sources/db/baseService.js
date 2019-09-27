import { idbCon, initJsStore } from "./idbService";
export class BaseService {
  constructor() {
    initJsStore();
  }

  get connection() {
    return idbCon;
  }
}
