import * as Types from '../types';

export function loginRequest(payload) {
  return {
    type: Types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: Types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: Types.LOGIN_FAILURE,
    payload,
  };
}
export function registerRequest(payload) {
  return {
    type: Types.REGISTER_REQUEST,
    payload,
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: Types.REGISTER_UPDATED_SUCCESS,
    payload,
  };
}
export function registerCreatedSuccess(payload) {
  return {
    type: Types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: Types.REGISTER_FAILURE,
    payload,
  };
}
