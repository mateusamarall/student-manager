import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import * as actions from '../../store/models/auth/actions';
import Loading from '../../components/Loading';

import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';

function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error('Senha inválida');
    }

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <input
          placeholder="Seu e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Sua Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}

export default Login;
