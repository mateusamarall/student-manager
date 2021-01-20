import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as Actions from './actions';
import * as Types from '../types';

const requisicao = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });
function* exampleRequest() {
  try {
    yield call(requisicao);
    yield put(Actions.clicaBotaoSuccess());
  } catch (error) {
    toast.error('Deu erro');
    yield put(Actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(Types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
