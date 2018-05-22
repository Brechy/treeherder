const headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

const writeJson = function writeJson(uri, data, method) {
  return fetch(uri, {
    body: JSON.stringify(data),
    method,
    mode: 'cors',
    credentials: 'include',
    headers,
  });
};

export const postJson = function postJson(uri, data) {
  return writeJson(uri, data, 'POST');
};

export const putJson = function putJson(uri, data) {
  return writeJson(uri, data, 'PUT');
};

export const deleteRecord = function deleteRecord(uri) {
  return fetch(`${uri}${this.job_id}-${this.bug_id}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers,
  });
};
