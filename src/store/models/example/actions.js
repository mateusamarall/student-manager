import * as Types from '../types';

export function clicaBotaoRequest() {
  return {
    type: Types.BOTAO_CLICADO_REQUEST,
  };
}

export function clicaBotaoSuccess() {
  return {
    type: Types.BOTAO_CLICADO_SUCCESS,
  };
}

export function clicaBotaoFailure() {
  return {
    type: Types.BOTAO_CLICADO_FAILURE,
  };
}
