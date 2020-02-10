import React from 'react';
import logo from '../../assets/logo-iapar.png';
import { Grid } from '@material-ui/core';

export default function ContainerMain(props){
    
    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center" className="my-4">
            <img src={logo} alt="iapar-logo" />
            {props.children}
        </Grid>
    );
}