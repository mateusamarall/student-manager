import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import api from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(api.post, 'tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Logado com sucesso');

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha inválido.');
    yield put(actions.loginFailure());
  }
}
function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}
// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;
  try {
    if (id) {
      yield call(api.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso!');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(api.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.error', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente');
      yield put(actions.loginFailure());

      return history.push('/login');
    }
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
