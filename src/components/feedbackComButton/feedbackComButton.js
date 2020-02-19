import React from 'react';
import { Alert } from '@material-ui/lab';
import ContainerMain from '../container-main/container-main';
import ContainerForm from '../container-form/container-form';
import ButtonSubmitForm from '../button-submit-form/button-submit-form';
import { Container } from '@material-ui/core';

export default function FeedbackComButton(props) {
    return (
        <ContainerMain>
            <ContainerForm maxWidth="sm" classCSS="p-0">
                <Alert severity="info">
                    {props.msg}    
                </Alert>
                <Container maxWidth="sm" className="position-absolute p-0">
                    <ButtonSubmitForm text={props.textButton} function={props.function} loading={false} />
                </Container>
            </ContainerForm>
        </ContainerMain>
    );
}