import React from 'react';
import { CircularProgress } from '@material-ui/core';
import ContainerMain from '../container-main/container-main';

//Tela exibida durante carregamentos. Pode receber uma mensagem.
export default function TelaEspera({mensagem}){

    return (
        <ContainerMain telaEspera={true}>
            <CircularProgress className="my-5" style={{ color: '#00a85D'}} disableShrink size="3em" />
            {mensagem}
        </ContainerMain>
    );
}