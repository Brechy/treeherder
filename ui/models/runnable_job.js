import { getProjectUrl } from "../helpers/urlHelper";
import JobModel from './job';

const uri = getProjectUrl("/runnable_jobs/");

export default class RunnableJobModel {
  constructor(data) {
    Object.assign(this, data);
  }

  static get_list(repoName, params) {
    return JobModel.getList(repoName, params, { uri });
  }
}
