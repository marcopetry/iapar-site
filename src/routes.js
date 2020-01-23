import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Cadastro from './containers/Cadastro/Cadastro';

export default function Routes() {
    
    return (
        <BrowserRouter>
            <Route path="/" exact component={Cadastro}/>
        </BrowserRouter>
    );
}