import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/models/auth/actions';
import { Container } from '../../styles/GlobalStyle';
import Loading from '../../components/Loading';
import api from '../../services/axios';
import history from '../../services/history';

import { Title, Form } from './styled';

function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);

        history.push('/');
      }
    };
    getData();
  }, [id]);

  async function handleChange(e) {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);

    setFoto(fileURL);
    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('photo', file);

    try {
      setIsLoading(true);

      await api.post(`photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso.');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      const errors = get(err, 'response.data.errors', []);

      toast.error('Erro ao enviar foto.');
      if (status === 400) {
        errors.map((error) => toast.error(error));
      }
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>
      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
export default Fotos;
