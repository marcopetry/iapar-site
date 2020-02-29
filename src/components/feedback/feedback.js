import React from 'react';
import { Alert } from '@material-ui/lab';
import ContainerMain from '../container-main/container-main';
import ContainerForm from '../container-form/container-form';

/**
 * Componente usado para retornar informações sem ação
 * para o usuário.
 * Recebe a msg como propriedade
 */
export default function Feedback({msg}) {
    return (
        <ContainerMain>
            <ContainerForm maxWidth="sm" classCSS="p-0">
                <Alert severity="info">
                    {msg}    
                </Alert>
            </ContainerForm>
        </ContainerMain>
    );
}