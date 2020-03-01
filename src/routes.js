import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Cadastro from './containers/Cadastro/Cadastro';
import Login from './containers/Login/Login';
import Autenticacao from './containers/Autenticacao/Autenticacao';
import Dashboard from './containers/Dashboard/Dashboard';
import Teste from './components/teste/teste';
import SelecionarTecnico from './containers/SelecionarTecnico/SelecionarTecnico';
import CadastrarPropriedade from './containers/CadastrarPropriedade/CadastrarPropriedade';
import Logout from './containers/Logout/Logout';
import CadastrarInfoPropriedade from './containers/CadastrarInfoPropriedade/CadastrarInfoPropriedade';

export default function Routes() {
    
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login}/>
            <Route exact path="/cadastro" component={Cadastro}/>
            <Route exact path="/auth/:token" component={Autenticacao} />
            <Route path="/menu" component={Dashboard} />
            <Route exact path="/menu/cadastrar-propriedade/cadastrar-proprietario" component={Cadastro} />
            <Route exact path="/menu/cadastrar-propriedade/selecionar-tecnicos" component={SelecionarTecnico} />
            <Route exact path='/menu/cadastrar-propriedade/dados-propriedade' component={CadastrarPropriedade} />
            <Route exact path="/menu/cadastrar-propriedade/inventario-recursos" component={CadastrarInfoPropriedade} />
            <Route exact path="/menu/cadastrar-adm" component={Cadastro} />
            <Route exact path="/menu/cadastrar-tecnico" component={Cadastro} />
            <Route exact path="/menu/teste" component={Teste} />
            <Route exact path="/menu/sair" component={Logout} />
        </BrowserRouter>
    );
}
