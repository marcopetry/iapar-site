import React from 'react';
import { Alert } from '@material-ui/lab';
import ContainerMain from '../container-main/container-main';
import ContainerForm from '../container-form/container-form';
import ButtonSubmitForm from '../button-submit-form/button-submit-form';
import { Container } from '@material-ui/core';

/**
 * Componente usado para dar um retorno pro usuário e a única opção
 * para sair do erro
 * Propriedades: {
 *      msg: informação pro usuário,
 *      textButton: informação que aparecerá no botão reforçando a mensagem
 *      funcao: o que será executado para sair do problema
 * }
 */
export default function FeedbackComButton({msg, textButton, funcao}) {
    return (
        <ContainerMain>
            <ContainerForm maxWidth="sm" classCSS="p-0">
                <Alert severity="info">
                    {msg}    
                </Alert>
                <Container maxWidth="sm" className="position-absolute p-0">
                    <ButtonSubmitForm text={textButton} funcao={funcao} loading={false} />
                </Container>
            </ContainerForm>
        </ContainerMain>
    );
}