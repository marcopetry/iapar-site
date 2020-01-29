import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-iapar.png';
import './Autenticacao.css';
import { Grid, CircularProgress } from '@material-ui/core';
import api from '../../services/api';

export default function Autenticacao({ history }) {
    const token = history.location.pathname.split('/')[2];

    localStorage.setItem('token', token);
    console.log(localStorage.getItem('token'));

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            <CircularProgress className="circular-auth" disableShrink size="3em" />
            Estamos carregando suas informações ... 
        </Grid>
    );
}