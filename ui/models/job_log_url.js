import { createQueryParams, getProjectUrl } from "../helpers/urlHelper";

const uri = getProjectUrl("/job-log-url/");

export default class JobLogUrlModel {
  constructor(data) {
    Object.assign(this, data);
  }

  // the options parameter is used to filter/limit the list of objects
  static getList(options) {
    return fetch(`${uri}${createQueryParams(options)}`)
      .then(resp => resp.json().then(data => (
        data.map((elem) => {
          const buildUrl = elem.url.slice(0, elem.url.lastIndexOf("/")) + "/";
          elem.buildUrl = buildUrl;
          return new JobLogUrlModel(elem);
        })
    )));
  }

  static get(pk) {
    return fetch(`${uri}${pk}`)
      .then(resp => resp.json().then(data => new JobLogUrlModel(data)));
  }
}
