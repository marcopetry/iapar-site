import React from 'react';
import { CircularProgress } from '@material-ui/core';
import ContainerMain from '../container-main/container-main';

export default function TelaEspera(props){

    return (
        <ContainerMain>
            <CircularProgress className="my-5" style={{ color: '#00a85D'}} disableShrink size="3em" />
            {props.mensagem}
        </ContainerMain>
    );
}