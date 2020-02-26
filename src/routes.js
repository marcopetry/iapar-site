import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Cadastro from './containers/Cadastro/Cadastro';
import Login from './containers/Login/Login';
import Autenticacao from './containers/Autenticacao/Autenticacao';
import Dashboard from './containers/Dashboard/Dashboard';
//import TelaEspera from './components/tela-espera/tela-espera';
import Teste from './components/teste/teste';
import SelecionarTecnico from './containers/SelecionarTecnico/SelecionarTecnico';
import CadastrarPropriedade from './containers/CadastrarPropriedade/CadastrarPropriedade';

export default function Routes() {
    
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/cadastro" component={Cadastro}/>
            <Route path="/auth/:token" component={Autenticacao} />
            <Route path="/menu" component={Dashboard} />
            <Route path="/menu/cadastrar-propriedade/cadastrar-proprietario" component={Cadastro} />
            <Route path="/menu/cadastrar-propriedade/selecionar-tecnicos" component={SelecionarTecnico} />
            <Route path='/menu/cadastrar-propriedade/dados-propriedade' component={CadastrarPropriedade} />
            <Route path="/menu/cadastrar-adm" component={Cadastro} />
            <Route path="/menu/cadastrar-tecnico" component={Cadastro} />
            <Route path="/menu/teste" component={Teste} />
        </BrowserRouter>
    );
}
