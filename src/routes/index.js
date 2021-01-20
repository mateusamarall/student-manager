import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Fotos from '../pages/Fotos';
import Register from '../pages/Register';

import Page404 from '../pages/Page404';
import MyRoute from './MyRoute';

function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isCLosed={false} />
      <MyRoute exact path="/aluno/:id/edit" component={Aluno} isCLosed />
      <MyRoute exact path="/aluno" component={Aluno} isCLosed />
      <MyRoute exact path="/fotos/:id" component={Fotos} isCLosed />

      <MyRoute exact path="/login" component={Login} isCLosed={false} />
      <MyRoute exact path="/register" component={Register} isCLosed={false} />

      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}

export default Routes;
