import React from 'react';
import {
  FaCircle,
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/models/auth/actions';
import history from '../../services/history';
import { Nav } from './styled';

function HeaderComponent() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  }
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link to="/logout" onClick={handleLogout}>
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
    </Nav>
  );
}

export default HeaderComponent;
