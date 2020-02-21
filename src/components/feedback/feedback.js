import React from 'react';
import { Alert } from '@material-ui/lab';
import ContainerMain from '../container-main/container-main';
import ContainerForm from '../container-form/container-form';

export default function Feedback(props) {
    return (
        <ContainerMain>
            <ContainerForm maxWidth="sm" classCSS="p-0">
                <Alert severity="info">
                    {props.msg}    
                </Alert>
            </ContainerForm>
        </ContainerMain>
    );
}