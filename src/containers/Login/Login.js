import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-iapar.png';
import './Login.css';
import { Grid, FormControl, InputLabel, Input, Container, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import api from '../../services/api';
import SpanErro from '../../components/span-erro/span-erro';
import { preencherArrayErrosComVazio } from '../../helpers/preencherArrayErrosComVazio';
import { validarTokenRetornarUsuario } from '../../helpers/validarTokenRetornarUsuario';
import TelaEspera from '../../components/tela-espera/tela-espera';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(preencherArrayErrosComVazio());
    const [erroBackend, setErroBackend] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token')); //vem nulo se não existir

    useEffect(() => {
        //validar token no backend
        if (token) {
            const alterarToken = e => setToken(e);
            validarTokenRetornarUsuario(history, alterarToken);
        }
    }, []);


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
            history.push('/menu');
        }

    }

    if(token) {
        return <TelaEspera />
    }

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            {erroBackend !== '' && <Alert className="alert-login" severity="error">{erroBackend}</Alert>}
            <Container maxWidth="xs" className="container-form-cadastro">
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
                <Button variant="contained" fullWidth className="btn-form" onClick={logar}>
                    {loading ? <CircularProgress className="color-circular" disableShrink size="1.7em" /> : 'Entrar'}
                </Button>
                <div className="container-link-login">
                    <Link to="/cadastro" classes="link-login">Não tem senha? Clique aqui!</Link>
                </div>
            </Container>
        </Grid>
    );
}