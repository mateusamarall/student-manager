import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

function HeaderComponent() {
  const botaoClicado = useSelector(
    (state) => state.exampleReducer.botaoClicado
  );

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/aa">
        <FaSignInAlt size={24} />
      </Link>
      {botaoClicado ? <p>clicado</p> : <p>nao clicado</p>}
    </Nav>
  );
}

export default HeaderComponent;
