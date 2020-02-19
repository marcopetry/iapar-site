import React from 'react';
import logo from '../../assets/logo-iapar.png';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function ContainerMain(props) {
    const history = useHistory();

    if(history.location.pathname !== '/' && history.location.pathname !== '/cadastro'){
        return (
            <Grid container direction="row" className="h-100 position-abolute">
                {props.children}
            </Grid>    
        );
    }

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center" className="py-4 h-100">
            <img src={logo} alt="iapar-logo" />
            {props.children}
        </Grid>
    );
}
