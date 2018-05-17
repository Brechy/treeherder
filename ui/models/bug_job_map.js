import { createQueryParams, getProjectUrl, getWriteHeaders } from "../helpers/urlHelper";

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
    return fetch(uri, {
      method: 'POST',
      body: JSON.stringify(this),
      headers: getWriteHeaders(),
    });
  }

  delete() {
    return fetch(`${uri}${this.job_id}-${this.bug_id}/`, {
      method: 'DELETE',
      headers: getWriteHeaders(),
    });
  }
}
