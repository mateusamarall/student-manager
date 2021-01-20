import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// essão função bloquea o acesso de usuário não autenticado a rotas privadas e redereciona para /login
function MyRoute({ component: Component, isCLosed, ...rest }) {
  const isLoggedIn = false;

  if (isCLosed && !isLoggedIn) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}
MyRoute.defaultProps = {
  isCLosed: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isCLosed: PropTypes.bool,
};
export default MyRoute;
