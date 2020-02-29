import React from 'react';
import './TelaConfirmacao.css';
import ContainerMain from '../container-main/container-main';
import ContainerForm from '../container-form/container-form';
import { Alert } from '@material-ui/lab';
import ButtonSubmitForm from '../button-submit-form/button-submit-form';

/**
 * Tela para confirmar ações perigosas ou logout.
 * Propriedades:
 * {
 *      msg: mensagem no alerta do que será feito,
 *      funcaoConfirmar: funcao executada quando confirmar,
 *      funcaoCancelar: cancela ação
 * }
 */
export default function TelaConfirmacao({msg, funcaoConfirmar, funcaoCancelar}) {

    return (
        <ContainerMain>
            <ContainerForm classCSS="w-50 pt-3">
                <Alert severity="warning" className="alert-confirmacao">
                    {msg}
                </Alert>
                <div className="container-btn-tela-confirmacao">
                    <ButtonSubmitForm loading={false}
                        text="Cancelar"
                        funcao={funcaoCancelar}
                        classCSS="btn-tela-confirmacao btn-cancelar"
                        variant="outlined"
                    />

                    <ButtonSubmitForm loading={false}
                        text="Confirmar"
                        funcao={funcaoConfirmar}
                        classCSS="btn-tela-confirmacao"
                    />
                </div>
            </ContainerForm>
        </ContainerMain>
    );
}