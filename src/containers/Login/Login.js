import React, { useState } from 'react';
import { Link }  from 'react-router-dom';
import logo from '../../assets/logo-iapar.png';
import './Login.css';
import { Grid, FormControl, InputLabel, Input, Container, Button, CircularProgress } from '@material-ui/core';
import api from '../../services/api';
import SpanErro from '../../components/span-erro/span-erro';
import { preencherArrayErrosComVazio } from '../../helpers/preencherArrayErrosComVazio';

export default function Login(){
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(preencherArrayErrosComVazio());
    const [token, setToken] = useState(localStorage.getItem('token')); //vem nulo se não existir

    async function logar(){
        let errosValidados = [];
        usuario === '' ? errosValidados.push('Campo obrigatório.') : errosValidados.push('');
        senha === '' ? errosValidados.push('Campo obrigatório.') : errosValidados.push('');
        if (errosValidados.some(elemento => elemento !== '')) {
            setErro(errosValidados);
            return;
        }
        
        setLoading(true);
        //const response = await api


    }

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            <Container maxWidth="xs" className="container-form-cadastro">
                <FormControl margin="dense" fullWidth={true}>
                    <InputLabel htmlFor="usuario">Email ou CPF</InputLabel>
                    <Input id="usuario"
                        required
                        onChange={(e) => setUsuario(e.target.value)}
                        value={usuario}
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