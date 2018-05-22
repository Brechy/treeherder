import { createQueryParams, getProjectUrl } from '../helpers/urlHelper';
import { deleteRecord, postJson } from '../helpers/fetchHelper';

const uri = getProjectUrl("/note/");

export default class JobClassificationModel {
  // JobClassificationModel is the js counterpart of note
  constructor(data) {
    Object.assign(this, data);
  }

  // a static method to retrieve a list of JobClassificationModel
  static get_list(params) {
    return fetch(`${uri}${createQueryParams(params)}`)
      .then(resp => resp.json().then(
        data => data.map(elem => new JobClassificationModel(elem))));
  }

  // a static method to retrieve a single instance of JobClassificationModel
  static get(pk) {
    return fetch(`${uri}${pk}`).then(resp => resp.json().then(
      data => new JobClassificationModel(data)));
  }

  // an instance method to create a new JobClassificationModel
  create() {
    return postJson(uri, this);
  }

  // an instance method to delete a JobClassificationModel object
  delete() {
    return deleteRecord(`${uri}${this.id}/`);
  }

}
