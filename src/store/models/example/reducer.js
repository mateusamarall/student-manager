import * as Types from '../types';

const initialState = {
  botaoClicado: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.BOTAO_CLICADO_SUCCESS: {
      console.log('sucesso');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }
    case Types.BOTAO_CLICADO_FAILURE: {
      console.log('deu ERRO');
      return state;
    }
    case Types.BOTAO_CLICADO_REQUEST: {
      console.log('estou fazendo a requisicao');
      return state;
    }
    default: {
      return state;
    }
  }
}
