import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Cadastro from './pages/Cadastro/Cadastro';

export default function Routes() {
    
    return (
        <BrowserRouter>
            <Route path="/" exact component={Cadastro}/>
        </BrowserRouter>
    );
}