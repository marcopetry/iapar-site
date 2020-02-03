import React from 'react';
import logo from '../../assets/logo-iapar.png';
import { Grid, CircularProgress } from '@material-ui/core';

export default function TelaEspera(props){

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            <CircularProgress className="circular-auth" disableShrink size="3em" />
            {props.mensagem}
        </Grid>
    );
}