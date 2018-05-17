import {
  getProjectJobUrl,
  getApiUrl,
  createQueryParams, getWriteHeaders
} from '../helpers/urlHelper';

export default class TextLogErrorsModel {
  constructor(data) {
    if (data.metadata === null) {
      data.metadata = {};
    }
    Object.assign(this, data);
  }

  static getUrl(job_id) {
    return getProjectJobUrl("/text_log_errors/", job_id);
  }

  static getList(job_id) {
    // a static method to retrieve a list of TextLogErrorsModel
    // the timeout configuration parameter is a promise that can be used to abort
    // the ajax request
    return fetch(`${TextLogErrorsModel.getUrl(job_id)}${createQueryParams({ cache: 'no-cache' })}`)
      .then(resp => resp.json().then(data => data.map(elem => new TextLogErrorsModel(elem))));
  }

  static verify(lineId, bestClassification, bugNumber) {
    return fetch(
      getApiUrl(`/text-log-error/${lineId}/`), {
        body: {
          best_classification: bestClassification,
          bug_number: bugNumber
        },
        method: 'PUT',
        headers: getWriteHeaders(),
      });
  }

  static verifyMany(body) {
    if (!body.length) {
      return Promise.resolve();
    }
    return fetch(getApiUrl("/text-log-error/"), {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: getWriteHeaders(),
    }).then(resp => resp.json());
  }
}
