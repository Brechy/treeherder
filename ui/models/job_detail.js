import { createQueryParams, getApiUrl } from '../helpers/urlHelper';

export default class JobDetailModel {
  static getJobDetails(params) {
    return fetch(`${getApiUrl("/jobdetail/")}${createQueryParams(params)}`)
      .then(resp => resp.json().then(data => data.results));
  }
}
