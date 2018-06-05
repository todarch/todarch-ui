import 'whatwg-fetch';
// function checkStatus(res, showErrDialog) {
//   if (res.status >= 200 && res.status < 300) {
//     return res;
//   }
//   return parseJSON(res).then(json => {
//     if (showErrDialog) {
//       console.log(json);
//     }
//     return Promise.reject(json);
//   })
// }
//
// function parseJSON(res) {
//   return res.text().then(text => {
//     console.log(text);
//     return text ? JSON.parse(text) : Promise.resolve({});
//   })
// }

function sanitizeUri(endpoint) {
  return endpoint.charAt(0) !== '/' ? '/' + endpoint : endpoint;
}

export default function callApi({ uri, method = 'GET', body = undefined, headers, showErrDialog = true }) {
  let endpoint = process.env.REACT_APP_API_ENDPOINT + sanitizeUri(uri);
  console.log("calling endpoint: ", endpoint);

  return fetch(endpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include',
    body: JSON.stringify(body)
  });
    // .then(response => checkStatus(response, showErrDialog), error => {
    //   console.log(error);
    //   const errorObj = { errCode: '-1', errDesc: 'Error Desc'};
    //   if (showErrDialog) {
    //     console.log(errorObj);
    //   }
    //   return Promise.reject(errorObj);
    // })
    // .then(parseJSON)
}