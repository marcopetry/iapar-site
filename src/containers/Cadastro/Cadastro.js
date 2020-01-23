import React, { useState } from 'react';
import logo from '../../assets/logo-iapar.png';
import './Cadastro.css';
import { Select, Grid, FormControl, InputLabel, Input, FormGroup, Container, MenuItem, Button } from '@material-ui/core';
import api from '../../services/api';

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
    const [tipo_registro_profissional, setTiporegistro_profissional] = useState('');
    const [anoFormatura, setAnoFormatura] = useState('');

    async function cadastrarUsuarioTecnico(){
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
            tipo_registro_profissional,
            registro_profissional,
            ano_formatura: anoFormatura,
            tipo_usuario: 'tecnico',
        });
        alert('passou')
        console.log(response);
    }

    return (
        <Grid container direction="column" justify="space-evenly" alignItems="center">
            <img src={logo} alt="iapar-logo" className="img-logo" />
            <Container maxWidth="sm" className="container-form-cadastro">
                <FormControl margin="dense" fullWidth="true">
                    <InputLabel htmlFor="nome-completo">Nome completo</InputLabel>
                    <Input id="nome-completo" 
                        aria-describedby="my-helper-text" 
                        required
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                </FormControl>
                <FormGroup row="true">
                    <FormControl margin="dense" className="input-lg">
                        <InputLabel htmlFor="cpf">CPF</InputLabel>
                        <Input id="cpf" 
                            aria-describedby="my-helper-text"
                            required
                            onChange={(e) => setCPF(e.target.value)}
                            value={cpf}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="telefone">Telefone</InputLabel>
                        <Input id="telefone" 
                            aria-describedby="my-helper-text" 
                            required
                            onChange={(e) => setTelefone(e.target.value)}
                            value={telefone}
                        />
                    </FormControl>
                </FormGroup>
                <FormGroup row="true">
                    <FormControl margin="dense" className="input-lg">
                        <InputLabel htmlFor="cidade">Cidade</InputLabel>
                        <Input id="cidade" 
                            aria-describedby="my-helper-text" 
                            required
                            onChange={(e) => setCidade(e.target.value)}
                            value={cidade}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="cep" >Cep</InputLabel>
                        <Input id="cep" 
                            aria-describedby="my-helper-text" 
                            required
                            onChange={(e) => setCep(e.target.value)}
                            value={cep}
                        />
                    </FormControl>
                </FormGroup>
                <FormControl margin="dense" fullWidth="true">
                    <InputLabel htmlFor="rua">Rua</InputLabel>
                    <Input id="rua" 
                        aria-describedby="my-helper-text" 
                        required
                        onChange={(e) => setRua(e.target.value)}
                        value={rua}
                    />
                </FormControl>
                <FormGroup row="true">
                    <FormControl margin="dense" className="input-lg">
                        <InputLabel htmlFor="bairro">Bairro</InputLabel>
                        <Input id="bairro" 
                            aria-describedby="my-helper-text" 
                            required
                            onChange={e => setBairro(e.target.value)}
                            value={bairro}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="numero" >Número</InputLabel>
                        <Input id="numero" 
                            aria-describedby="my-helper-text" 
                            required
                            onChange={(e) => setNumero(e.target.value)}
                            value={numero}
                        />
                    </FormControl>
                </FormGroup>
                <FormControl margin="dense" fullWidth="true">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" 
                        aria-describedby="my-helper-text" 
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </FormControl>
                <FormControl margin="dense" fullWidth="true">
                    <InputLabel htmlFor="senha">Senha</InputLabel>
                    <Input id="senha" 
                        aria-describedby="my-helper-text" 
                        required
                        onChange={(e) => setSenha(e.target.value)}
                        value={senha}
                    />
                </FormControl>
                <FormGroup row="true">
                    <FormControl margin="dense" className="input-md">
                        <InputLabel htmlFor="tipo-registro_profissional" >Tipo Registro</InputLabel>
                        <Select id="tipo-registro_profissional" 
                            aria-describedby="my-helper-text"
                            onChange={e => setTiporegistro_profissional(e.target.value)}
                            value={tipo_registro_profissional}
                        >
                            <MenuItem value="CREA">CREA</MenuItem>
                            <MenuItem value="CRMV">CRMV</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="dense" className="input-md ml-input-md">
                        <InputLabel htmlFor="numero-registro_profissional" >Número do Registro</InputLabel>
                        <Input id="numero-registro_profissional" 
                            aria-describedby="my-helper-text" 
                            required
                            onChange={e => setRegistroProfissional(e.target.value)}
                            value={registro_profissional}
                        />
                    </FormControl>
                    <FormControl margin="dense" className="input-md ml-input-md">
                        <InputLabel htmlFor="ano-formatura" >Ano Formatura</InputLabel>
                        <Input id="ano-formatura" 
                            aria-describedby="my-helper-text" 
                            required
                            onChange={e => setAnoFormatura(e.target.value)}
                            value={anoFormatura}
                        />
                    </FormControl>
                </FormGroup>
                <Button variant="contained" fullWidth="true" className="btn-form" onClick={cadastrarUsuarioTecnico}>
                    Cadastrar
                </Button>
            </Container>
        </Grid>
    );
}

/*
    "nome": "Marco",
  "email": "yeswesafsdfss@gfdf.casdaom",
  "senha": "123456",
  "cpf": "aseassdfsdfdxw",
  "cidade": "Dois Vizinhos",
  "rua": "Wenceslau",
  "numero": "166",
  "bairro": "Torres",
  "cep": "85660-000",
  "telefone": "99999999",
  "tipo_usuario": "tecnico",
  "ano_formatura": "2020",
  "tipo_registro_profissional": "CREA",
  "registro_profissional_profissional": "123456"
*/