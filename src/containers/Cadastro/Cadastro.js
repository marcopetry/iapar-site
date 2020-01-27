import React, { useState } from 'react';
import logo from '../../assets/logo-iapar.png';
import './Cadastro.css';
import { Select, Grid, FormControl, InputLabel, Input, FormGroup, Container, MenuItem, Button, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import api from '../../services/api';
import SpanErro from '../../components/span-erro/span-erro';
import { validarInformacoesCadastro } from '../../validators/validator-cadastro-usuario';
import { preencherArrayErrosComVazio } from '../../helpers/preencherArrayErrosComVazio';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [registro_profissional, setRegistroProfissional] = useState('');
    const [tipo_registro, setTiporegistro] = useState('');
    const [anoFormatura, setAnoFormatura] = useState('');
    const [loading, setLoading] = useState('completado');
    const [erros, setErros] = useState(preencherArrayErrosComVazio());

    async function cadastrarUsuarioTecnico() {
        const dados = {
            nome,
            cpf,
            telefone,
            cidade,
            cep,
            rua,
            numero,
            bairro,
            email,
            senha,
            tipo_registro,
            registro_profissional,
            ano_formatura: anoFormatura,
            tipo_usuario: 'tecnico',
        }
        //validators
        const errosValidados = validarInformacoesCadastro(dados);
        setErros(errosValidados);
        if (errosValidados.some(elemento => elemento !== '')) {
            return;
        }

        setLoading(true);
        const response = await api.post('/user', {
            nome,
            cpf,
            telefone,
            cidade,
            cep,
            rua,
            numero,
            bairro,
            email,
            senha,
            tipo_registro,
            registro_profissional,
            ano_formatura: anoFormatura,
            tipo_usuario: 'tecnico',
        });
        //console.log(response);
        setLoading('completado');
    }

    if (loading === 'completado') {
        return (
            <Grid container direction="column" justify="space-evenly" alignItems="center">
                <img src={logo} alt="iapar-logo" className="img-logo" />
                <Container maxWidth="sm" className="container-form-cadastro">
                    <Alert severity="info">
                        Você precisa acessar seu email para confirmar seu cadastro.
                    </Alert>
                </Container>
            </Grid>
        );
    }

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            <Container maxWidth="sm" className="container-form-cadastro">
                <FormControl margin="dense" fullWidth>
                    <InputLabel htmlFor="nome-completo">Nome completo</InputLabel>
                    <Input id="nome-completo"
                        required={true}
                        onChange={(e) => setNome(e.target.value)}
                        error={erros[0] === '' ? false : true}
                        value={nome}
                    />
                    <SpanErro erro={erros[0]} />
                </FormControl>
                <FormGroup row>
                    <FormControl margin="dense" className="input-lg">
                        <InputLabel htmlFor="cpf">CPF</InputLabel>
                        <Input id="cpf"
                            required
                            onChange={(e) => setCPF(e.target.value)}
                            value={cpf}
                            error={erros[1] === '' ? false : true}
                        />
                        <SpanErro erro={erros[1]} />
                    </FormControl>
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="telefone">Telefone</InputLabel>
                        <Input id="telefone"
                            required
                            onChange={(e) => setTelefone(e.target.value)}
                            value={telefone}
                            error={erros[2] === '' ? false : true}
                        />
                        <SpanErro erro={erros[2]} />
                    </FormControl>
                </FormGroup>
                <FormGroup row>
                    <FormControl margin="dense" className="input-lg">
                        <InputLabel htmlFor="cidade">Cidade</InputLabel>
                        <Input id="cidade"
                            required
                            onChange={(e) => setCidade(e.target.value)}
                            value={cidade}
                            error={erros[3] === '' ? false : true}
                        />
                        <SpanErro erro={erros[3]} />
                    </FormControl>
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="cep" >Cep</InputLabel>
                        <Input id="cep"
                            required
                            onChange={(e) => setCep(e.target.value)}
                            value={cep}
                            error={erros[4] === '' ? false : true}
                        />
                        <SpanErro erro={erros[4]} />
                    </FormControl>
                </FormGroup>
                <FormControl margin="dense" fullWidth>
                    <InputLabel htmlFor="rua">Rua</InputLabel>
                    <Input id="rua"
                        required
                        onChange={(e) => setRua(e.target.value)}
                        value={rua}
                        error={erros[5] === '' ? false : true}
                    />
                    <SpanErro erro={erros[5]} />
                </FormControl>
                <FormGroup row={true}>
                    <FormControl margin="dense" className="input-lg">
                        <InputLabel htmlFor="bairro">Bairro</InputLabel>
                        <Input id="bairro"
                            required
                            onChange={e => setBairro(e.target.value)}
                            value={bairro}
                            error={erros[6] === '' ? false : true}
                        />
                        <SpanErro erro={erros[6]} />
                    </FormControl>
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="numero" >Número</InputLabel>
                        <Input id="numero"
                            required
                            onChange={(e) => setNumero(e.target.value)}
                            value={numero}
                            error={erros[7] === '' ? false : true}
                        />
                        <SpanErro erro={erros[7]} />
                    </FormControl>
                </FormGroup>
                <FormControl margin="dense" fullWidth={true}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email"
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        error={erros[8] === '' ? false : true}
                    />
                    <SpanErro erro={erros[8]} />
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel htmlFor="senha">Senha</InputLabel>
                    <Input id="senha"
                        required
                        type="password"
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                        error={erros[9] === '' ? false : true}
                    />
                    <SpanErro erro={erros[9]} />
                </FormControl>
                <FormGroup row={true}>
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="tipo-registro_profissional" >Tipo Registro</InputLabel>
                        <Select id="tipo-registro_profissional"
                            onChange={e => setTiporegistro(e.target.value)}
                            value={tipo_registro}
                            error={erros[10] === '' ? false : true}
                        >
                            <MenuItem value="CREA">CREA</MenuItem>
                            <MenuItem value="CRMV">CRMV</MenuItem>
                        </Select>
                        <SpanErro erro={erros[10]} />
                    </FormControl>
                    <FormControl margin="dense" className="input-md ml-input-md">
                        <InputLabel htmlFor="numero-registro_profissional" >Número do Registro</InputLabel>
                        <Input id="numero-registro_profissional"
                            required
                            onChange={e => setRegistroProfissional(e.target.value)}
                            value={registro_profissional}
                            error={erros[11] === '' ? false : true}
                        />
                        <SpanErro erro={erros[11]} />
                    </FormControl>
                    <FormControl margin="dense" className="input-md ml-input-md">
                        <InputLabel htmlFor="ano-formatura" >Ano Formatura</InputLabel>
                        <Input id="ano-formatura"
                            required
                            onChange={e => setAnoFormatura(e.target.value)}
                            value={anoFormatura}
                            error={erros[12] === '' ? false : true}
                        />
                        <SpanErro erro={erros[12]} />
                    </FormControl>
                </FormGroup>
                <Button variant="contained" fullWidth className="btn-form" onClick={cadastrarUsuarioTecnico}>
                    {loading ? <CircularProgress disableShrink size="1.7em" /> : 'Cadastrar'}
                </Button>
            </Container>
        </Grid>
    );
}