import React from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyle';
import { Title, Paragrafo } from './styled';
import * as Example from '../../store/models/example/actions';

function LoginComponent() {
  const dispatch = useDispatch();
  // toast.success('oi');
  // toast.error('oi');
  function handleClick(e) {
    e.preventDefault();
    dispatch(Example.clicaBotaoRequest());
  }
  return (
    <Container>
      <Title isRed={false}>
        LoginComponent
        <small>oie</small>
      </Title>
      <Paragrafo>lorem ipsum</Paragrafo>
      <button type="button" onClick={handleClick}>
        enviar
      </button>
    </Container>
  );
}

export default LoginComponent;
