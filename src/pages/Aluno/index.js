import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/models/auth/actions';
import Loading from '../../components/Loading';
import api from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';

function Aluno({ match }) {
  const id = get(match, 'params.id', 0);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/alunos/${id}`);
        // const Foto = get(data, 'Fotos[0].url', '');
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
          history.push('/');
        }
      }
    }
    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;
    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres.');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres.');
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
    }
    if (!isEmail(email)) {
      toast.error('E-mail inválido.');
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido.');
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade inválida.');
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso inválido.');
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura inválida.');
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        // editando

        await api.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        // criando

        const { data } = await api.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/alunos/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />

        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />

        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />

        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Aluno;
