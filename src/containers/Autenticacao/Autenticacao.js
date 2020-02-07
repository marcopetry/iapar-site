import React, { useState } from 'react';
import logo from '../../assets/logo-iapar.png';
import './Autenticacao.css';
import { Grid, CircularProgress, FormControl, Input, InputLabel, Container, Button } from '@material-ui/core';
import { Link }  from 'react-router-dom';
import api from '../../services/api';
import { Alert } from '@material-ui/lab';
import SpanErro from '../../components/span-erro/span-erro';
import TelaEspera from '../../components/tela-espera/tela-espera';

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

    async function reenviarTokenVerificacao(){
        if(email === ''){
            setErroEmail('Campo email está vazio');
            return;
        }
        setLoading(true);
        const response = await api.post('/auth', {email});
        setErro(response.data.message);
        setLoading(false);
    }

    if (erro === '') {
        validarUsuario();
        return (
            <TelaEspera mensagem="Estamos validando suas informações ..." />
        );
    }

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            <Container className="container-auth" maxWidth="xs">
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
                                <Button variant="contained" color="secondary" fullWidth className="btn-auth" onClick={reenviarTokenVerificacao}>
                                    {loading ? <CircularProgress className="color-circular" disableShrink size="1.7em" /> : 'Reenviar verificador' }
                                </Button>
                                <div className="container-link-auth">
                                    <Link to="/cadastro" className="link-auth">Clique aqui para cadastrar-se.</Link>
                                </div>
                            </>
                        )
                }
            </Container>
        </Grid>
    );
}