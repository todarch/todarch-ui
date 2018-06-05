import callApi from './callApi';

const UM = "/um";
const UM_API = UM + "/api";
const NON_SECURED = UM + "/non-secured";
const UP = NON_SECURED + "/up";
const REGISTER_URI = NON_SECURED + "/register";
const AUTHENTICATE_URI = NON_SECURED + "/authenticate";
const CURRENT_USER_INFO_URI = UM_API + "/account";

export function up() {
  return callApi({
    uri: UP
  });
}

export function register(registrationReq) {
  return callApi({
    uri: REGISTER_URI,
    method: 'POST',
    body: registrationReq
  });
}

export function authenticate(authReq) {
  return callApi({
    uri: AUTHENTICATE_URI,
    method: 'POST',
    body: authReq
  });
}

export function currentUser() {
  return callApi({
    uri: CURRENT_USER_INFO_URI,
    method: 'GET'
  });
}
