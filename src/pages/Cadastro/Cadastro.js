import React from 'react';
import logo from '../../assets/logo-iapar.png';
import './Cadastro.css';

export default function Cadastro(){

    return(
        <div className="container-principal">
            <div className="col-2">
                <img src={logo} alt="iapar" />
            </div>
        </div>
    );
}