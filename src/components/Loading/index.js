import React from 'react';
import PropsTypes from 'prop-types';
import { Container } from './styled';

function Loading({ isLoading }) {
  if (!isLoading) {
    return <></>;
  }

  return (
    <Container>
      <div />
      <span>Carregando....</span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.proTypes = {
  isLoading: PropsTypes.bool,
};
export default Loading;
