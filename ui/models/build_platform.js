import { createQueryParams, getApiUrl } from '../helpers/urlHelper';

const uri = getApiUrl("/buildplatform/");

export default class BuildPlatformModel {

  // ThBuildPlatform is the js counterpart of buildplatform
  constructor(data) {
    // creates a new instance of BuildPlatformModel
    // using the provided properties
    Object.assign(this, data);
  }

  get_list(options) {
    // a static method to retrieve a list of ThBuildPlatformModel
    options = options || {};
    return fetch(`${uri}${createQueryParams(options)}`)
      .then(resp => resp.json().then(
        data => data.map(elem => new BuildPlatformModel(elem))));
  }

  static get(pk) {
    return fetch(`${uri}${pk}`).then(resp => resp.json().then(
      data => new BuildPlatformModel(data)));
  }
}
