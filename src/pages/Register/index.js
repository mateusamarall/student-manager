import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../components/Loading';
import * as actions from '../../store/models/auth/actions';
import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';

function Register() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.user.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    if (!userId) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, userId, nomeStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (!userId && (password.length < 6 || password.length > 50)) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error('Senha deve ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, userId }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{userId ? 'Editar dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="Senha">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </label>
        <button type="submit">Salvar </button>
      </Form>
    </Container>
  );
}

export default Register;
