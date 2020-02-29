import React, { useState } from 'react';
import './Autenticacao.css';
import { FormControl, Input, InputLabel, Container } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import SpanErro from '../../components/span-erro/span-erro';
import TelaEspera from '../../components/tela-espera/tela-espera';
import ContainerMain from '../../components/container-main/container-main';
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form';
import LinkRedirect from '../../components/link/link';
import api from '../../services/api';

export default function Autenticacao({ history }) {
    const token = history.location.pathname.split('/')[2];
    localStorage.setItem('token', token);
    const [erro, setErro] = useState('');
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [loading, setLoading] = useState(false);

    async function validarUsuario() {
        const response = await api.get(`/auth/${token}`);
        response.data.erro === undefined ?
            history.push('/menu', { usuario: response.data }) :
            setErro('Seu token expirou. Digite seu email para enviarmos novamente.');
    }

    async function reenviarTokenVerificacao() {
        if (email === '') {
            setErroEmail('Campo email está vazio');
            return;
        }
        setLoading(true);
        const response = await api.post('/auth', { email });
        setErro(response.data.message);
        setLoading(false);
    }

    if (erro === '') {
        validarUsuario();
        return (
            <TelaEspera mensagem="Estamos validando suas informações ..." />
        );
    }

    //função para ajustar padding conforme dados, classe bootstrap
    const padding = erro !== 'Token reenviado. Acesse seu email para confirmar.' ? 'pt-3' : 'p-0';

    return (
        <ContainerMain>
            <Container className={"container-auth " + padding} maxWidth="xs">
                <Alert severity="error" className="alert-auth-error">{erro}</Alert>
                {
                    erro !== 'Token reenviado. Acesse seu email para confirmar.' &&
                    (
                        <>
                            <FormControl margin="dense" className="container-input-email-auth">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email"
                                    error={erroEmail === 'Campo email está vazio' ? true : false}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <SpanErro erro={erroEmail} />
                            </FormControl>
                            <ButtonSubmitForm text="Reenviar verificador" loading={loading} funcao={reenviarTokenVerificacao} />
                            <LinkRedirect url="/cadastro" text="Clique aqui para cadastrar-se." />
                        </>
                    )
                }
            </Container>
        </ContainerMain>
    );
}