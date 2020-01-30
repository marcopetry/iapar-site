import React, { useState } from 'react';
import logo from '../../assets/logo-iapar.png';
import './Autenticacao.css';
import { Grid, CircularProgress, FormControl, Input, InputLabel, Container, Button } from '@material-ui/core';
import api from '../../services/api';
import { Alert } from '@material-ui/lab';
import SpanErro from '../../components/span-erro/span-erro';

export default function Autenticacao({ history }) {
    const token = history.location.pathname.split('/')[2];
    localStorage.setItem('token', token);
    const [erro, setErro] = useState('');
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState('');

    async function validarUsuario() {
        const response = await api.post('/auth', { token });
        if (response.data.erro === undefined) {
            const [usuario] = response.data[1];
            history.push('/menu', { usuario });
        } else {
            setErro('Seu token expirou. Digite seu email para enviarmos novamente.');
        }
    }

    async function reenviarTokenVerificacao(){
        if(email === ''){
            setErroEmail('Campo email está vazio');
            return;
        } 
        alert(email);
    }

    if (erro === '') {
        validarUsuario();
    }

    if (erro !== '') {

        return (
            <Grid container direction="column" justify="space-evenly" alignItems="center">
                <img src={logo} alt="iapar-logo" className="img-logo" />
                <Container className="container-auth" maxWidth="xs">
                    <Alert severity="error" className="alert-auth-error">{erro}</Alert>
                    <FormControl margin="dense" className="container-input-email-auth">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email"
                            error={erroEmail === 'Campo email está vazio' ? true : false}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <SpanErro erro={erroEmail === 'Campo email está vazio' ? erroEmail : ''} />
                    </FormControl>
                    <Button variant="contained" color="secondary" fullWidth className="btn-auth" onClick={reenviarTokenVerificacao}>
                        Reenviar verificador
                    </Button>
                </Container>
            </Grid>
        );
    }

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            <CircularProgress className="circular-auth" disableShrink size="3em" />
            Estamos validando suas informações ...
        </Grid>
    );
}