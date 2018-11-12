import callApi from './callApi';
import * as methods from './methods';

const UM = '/um';
const UM_API = UM + '/api';
const NON_SECURED = UM + '/non-secured';
const UP = NON_SECURED + '/up';
const REGISTER_URI = NON_SECURED + '/register';
const AUTHENTICATE_URI = NON_SECURED + '/authenticate';
const CURRENT_USER_INFO_URI = UM_API + '/account';
const IS_ALREADY_AUTHENTICATED = UM_API + '/authenticate';
const LOGOUT = UM_API + '/logout';
const ACTIVATE_ACCOUNT_WITH_CODE = NON_SECURED + '/activate-account?code=';

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

export function logout() {
  return callApi({
    uri: LOGOUT,
    method: 'POST'
  });
}

export function isAlreadyAuthenticated() {
  return callApi({
    uri: IS_ALREADY_AUTHENTICATED,
    method: methods.GET
  });
}

export function currentUser() {
  return callApi({
    uri: CURRENT_USER_INFO_URI,
    method: 'GET'
  });
}

export function activateAccount(activationCode) {
  return callApi({
    uri: ACTIVATE_ACCOUNT_WITH_CODE + activationCode,
    method: 'POST'
  });
}
