import 'whatwg-fetch';
import * as status from 'http-status';

function sanitizeUri(endpoint) {
  return endpoint.charAt(0) !== '/' ? '/' + endpoint : endpoint;
}

/**
 * Note that the promise won't be rejected in case of HTTP 4xx or 5xx server responses.
 * The promise will be resolved just as it would be for HTTP 2xx.
 * Inspect the response.status number within the resolved callback to add conditional handling of server errors to your code.
 */
export default function callApi({
  uri,
  method = 'GET',
  body = undefined,
  headers,
  showErrDialog = true
}) {
  let endpoint = process.env.REACT_APP_API_ENDPOINT + sanitizeUri(uri);
  console.log('calling endpoint: ', endpoint);

  return fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.status === status.NO_CONTENT) {
        return { json: [], response };
      }
      return response.json().then(json => ({ json, response }));
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        // cookie is expired, reload UserContextProvider
        // if (response.status === status.FORBIDDEN) { // recursion
        //   window.location.reload();
        // }
        console.log('error:' + JSON.stringify(json));
        return Promise.reject(json);
      }
      return json;
    });
}
