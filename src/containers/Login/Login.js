import React, { useState, useEffect } from 'react';
import './Login.css';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import api from '../../services/api';
import SpanErro from '../../components/span-erro/span-erro';
import { preencherArrayErrosComVazio } from '../../helpers/preencherArrayErrosComVazio';
import { validarTokenRetornarUsuario } from '../../helpers/validarTokenRetornarUsuario';
import TelaEspera from '../../components/tela-espera/tela-espera';
import ContainerMain from '../../components/container-main/container-main';
import ContainerForm from '../../components/container-form/container-form';
import LinkRedirect from '../../components/link/link';
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(preencherArrayErrosComVazio());
    const [erroBackend, setErroBackend] = useState(history.location.state ? history.location.state.tipo_usuario : '');
    const [token, setToken] = useState(localStorage.getItem('token')); //vem nulo se não existir
    const alterarToken = e => setToken(e);

    useEffect(() => {
        //validar token no backend
        if (token) {
            validarTokenRetornarUsuario(history, alterarToken);
        }
    }, [token, history]);


    async function logar() {
        let errosValidados = [];
        email === '' ? errosValidados.push('Campo obrigatório.') : errosValidados.push('');
        senha === '' ? errosValidados.push('Campo obrigatório.') : errosValidados.push('');
        if (errosValidados.some(elemento => elemento !== '')) {
            setErro(errosValidados);
            return;
        }

        setLoading(true);
        const response = await api.post('/login', { email, senha });

        if(!response.data.token){
            setLoading(false);
            setErroBackend(response.data.tipo_usuario)  
        } else {
            localStorage.setItem('token', response.data.token);
            history.push('/menu', { tipo_usuario: response.data.tipo_usuario });
        }

    }

    if(token) {
        return <TelaEspera />
    }

    return (
        <ContainerMain>
            {erroBackend !== '' && <Alert className="alert-login" severity="error">{erroBackend}</Alert>}
            <ContainerForm maxWidth="xs">
                <FormControl margin="dense" fullWidth={true}>
                    <InputLabel htmlFor="email">Email ou CPF</InputLabel>
                    <Input id="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        error={erro[0] !== '' ? true : false}
                    />
                    <SpanErro erro={erro[0]} />
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel htmlFor="senha">Senha</InputLabel>
                    <Input id="senha"
                        required
                        type="password"
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                        error={erro[1] !== '' ? true : false}
                    />
                    <SpanErro erro={erro[1]} />
                </FormControl>
                <ButtonSubmitForm text="Entrar" loading={loading} function={logar} />
                <LinkRedirect url="/cadastro" text="Não tem senha? Clique aqui!" />
            </ContainerForm>
        </ContainerMain>
    );
}