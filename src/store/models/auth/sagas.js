/* eslint-disable no-unused-vars */
/* eslint-disable require-yield */
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as Actions from './actions';
import * as Types from '../types';

function* loginRequest({ payload }) {
  console.log('SAGA', payload);
}

export default all([takeLatest(Types.LOGIN_REQUEST, loginRequest)]);
