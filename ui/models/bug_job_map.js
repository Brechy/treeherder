import { createQueryParams, getProjectUrl } from "../helpers/urlHelper";
import { deleteRecord, postJson } from "../helpers/fetchHelper";

const uri = getProjectUrl("/bug-job-map/");

export default class BugJobMapModel {
  constructor(data) {
    Object.assign(this, data);
  }

  // the options parameter is used to filter/limit the list of objects
  static getList(options) {
    return fetch(`${uri}${createQueryParams(options)}`)
      .then(resp => resp.json().then(data => (
        data.map(elem => new BugJobMapModel(elem))
    )));
  }

  static get(pk) {
    return fetch(`${uri}${pk}`)
      .then(resp => resp.json().then(data => new BugJobMapModel(data)));
  }

  create() {
    return postJson(uri, this);
  }

  delete() {
    return deleteRecord(`${uri}${this.job_id}-${this.bug_id}/`);
  }
}
