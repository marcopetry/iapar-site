import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Cadastro from './containers/Cadastro/Cadastro';
import Login from './containers/Login/Login';
import Autenticacao from './containers/Autenticacao/Autenticacao';
import Dashboard from './containers/Dashboard/Dashboard';

export default function Routes() {
    
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/cadastro" component={Cadastro}/>
            <Route path="/auth/:token" component={Autenticacao} />
            <Route path="/menu" component={Dashboard} />
        </BrowserRouter>
    );
}
