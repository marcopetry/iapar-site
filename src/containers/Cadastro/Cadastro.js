import React, { useState, useEffect } from 'react'
import './Cadastro.css'
import { useHistory } from 'react-router-dom'
import { Select, FormControl, InputLabel, Input, FormGroup, MenuItem, Checkbox } from '@material-ui/core'
import api from '../../services/api'
import SpanErro from '../../components/span-erro/span-erro'
import { validarInformacoesCadastro } from '../../validators/validator-cadastro-usuario'
import { preencherArrayErrosComVazio } from '../../helpers/preencherArrayErrosComVazio'
import {
  maskCPF,
  confereNumeroOuBackspace,
  maskTelefone,
  maskCEP,
  apenasNumeros,
  apenasAno,
} from '../../helpers/masks-cadastro'
import { setarErrosBackend } from '../../helpers/setarErrosBackend'
import ContainerForm from '../../components/container-form/container-form'
import ContainerMain from '../../components/container-main/container-main'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'
import LinkRedirect from '../../components/link/link'
import Feedback from '../../components/feedback/feedback'

export default function Cadastro() {
  const history = useHistory()
  const [nome, setNome] = useState('')
  const [cpf, setCPF] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cidade, setCidade] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [registro_profissional, setRegistroProfissional] = useState('')
  const [tipo_registro, setTiporegistro] = useState('')
  const [anoFormatura, setAnoFormatura] = useState('')
  const [cnpj, setCNPJ] = useState('')
  const [loading, setLoading] = useState(false)
  const [erros, setErros] = useState(preencherArrayErrosComVazio(14))
  const [tipo_usuario, setTipoUsuario] = useState('')

  useEffect(() => {
    if (history.location.pathname === '/cadastro') {
      setTipoUsuario('tecnico')
      return
    }

    if (history.location.pathname === '/menu/cadastrar-propriedade/cadastrar-proprietario') {
      setTipoUsuario('proprietario')
      setSenha('123456')
      return
    }

    if (history.location.pathname === '/menu/cadastrar-tecnico') {
      setTipoUsuario('tecnico')
      setSenha('123456')
      return
    }

    if (history.location.pathname === '/menu/cadastrar-adm') {
      setTipoUsuario('admin')
      setSenha('123456')
      return
    }
  }, [history.location.pathname])

  const limpar = () => {
    setNome('')
    setCPF('')
    setTelefone('')
    setCidade('')
    setCep('')
    setRua('')
    setBairro('')
    setNumero('')
    setEmail('')
    setTiporegistro('')
    setRegistroProfissional('')
    setAnoFormatura('')
  }

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
      tipo_usuario,
      cnpj,
    }
    /*
            validators
            uso essa constante errosvalidados para poder pegar em tempo de execução os erros e verificar 
            para chamar o backend, pois setar o estado leva um tempo e não consigo pegar pra validar.
            Se tiver um erro ele retorna tela do formulário.
        */
    const errosValidados = validarInformacoesCadastro(dados, history.location.pathname)
    setErros(errosValidados)
    if (errosValidados.some((elemento) => elemento !== '')) {
      return
    }

    setLoading(true)
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
      tipo_usuario,
      cnpj,
    })

    setLoading(false)
    //backend retorna array de erros, caso vazio, completado
    if (response.data.resposta === 'Cadastro realizado com sucesso.') {
      setLoading(response)
    } else {
      if (response.data.resposta === 'Tente novamente.') {
        alert('Tente novamente mais tarde.')
      } else {
        alert(response.data.resposta)
        setErros(setarErrosBackend(response.data.resposta))
      }
    }
  }

  if (loading.data?.resposta === 'Cadastro realizado com sucesso.') {
    if (history.location.pathname === '/cadastro') {
      return <Feedback msg="Você precisa acessar seu email para confirmar seu cadastro." />
    }

    if (history.location.pathname === '/menu/cadastrar-propriedade/cadastrar-proprietario') {
      history.push(`/menu/cadastrar-propriedade/${loading.data.id}/selecionar-tecnicos`)
    }

    if (
      history.location.pathname === '/menu/cadastrar-adm' ||
      history.location.pathname === '/menu/cadastrar-tecnico'
    ) {
      limpar()
      setLoading(false)
    }
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm">
        <FormControl margin="dense" fullWidth>
          <InputLabel htmlFor="nome-completo">Nome completo</InputLabel>
          <Input
            id="nome-completo"
            onChange={(e) => setNome(e.target.value)}
            error={erros[0] === '' ? false : true}
            value={nome}
          />
          <SpanErro erro={erros[0]} />
        </FormControl>
        <FormGroup row>
          <FormControl margin="dense" className="input-lg">
            <InputLabel htmlFor="cpf">CPF</InputLabel>
            <Input
              id="cpf"
              onKeyDown={(e) => (confereNumeroOuBackspace(e) ? setCPF(maskCPF(e.key, cpf)) : null)}
              value={cpf}
              error={erros[1] === '' ? false : true}
            />
            <SpanErro erro={erros[1]} />
          </FormControl>
          <FormControl margin="dense" className="input-md">
            <InputLabel htmlFor="telefone">Telefone</InputLabel>
            <Input
              id="telefone"
              onKeyDown={(e) => (confereNumeroOuBackspace(e) ? setTelefone(maskTelefone(e.key, telefone)) : null)}
              value={telefone}
              error={erros[2] === '' ? false : true}
            />
            <SpanErro erro={erros[2]} />
          </FormControl>
        </FormGroup>
        <FormGroup row>
          <FormControl margin="dense" className="input-lg">
            <InputLabel htmlFor="cidade">Cidade</InputLabel>
            <Input
              id="cidade"
              onChange={(e) => setCidade(e.target.value)}
              value={cidade}
              error={erros[3] === '' ? false : true}
            />
            <SpanErro erro={erros[3]} />
          </FormControl>
          <FormControl margin="dense" className="input-md">
            <InputLabel htmlFor="cep">Cep</InputLabel>
            <Input
              id="cep"
              onKeyDown={(e) => (confereNumeroOuBackspace(e) ? setCep(maskCEP(e.key, cep)) : null)}
              value={cep}
              error={erros[4] === '' ? false : true}
            />
            <SpanErro erro={erros[4]} />
          </FormControl>
        </FormGroup>
        <FormControl margin="dense" fullWidth>
          <InputLabel htmlFor="rua">Rua</InputLabel>
          <Input id="rua" onChange={(e) => setRua(e.target.value)} value={rua} error={erros[5] === '' ? false : true} />
          <SpanErro erro={erros[5]} />
        </FormControl>
        <FormGroup row={true}>
          <FormControl margin="dense" className="input-lg">
            <InputLabel htmlFor="bairro">Bairro</InputLabel>
            <Input
              id="bairro"
              onChange={(e) => setBairro(e.target.value)}
              value={bairro}
              error={erros[6] === '' ? false : true}
            />
            <SpanErro erro={erros[6]} />
          </FormControl>
          <FormControl margin="dense" className="input-md">
            <InputLabel htmlFor="numero">Número</InputLabel>
            <Input
              id="numero"
              onKeyDown={(e) => (confereNumeroOuBackspace(e) ? setNumero(apenasNumeros(e.key, numero)) : null)}
              value={numero}
              error={erros[7] === '' ? false : true}
            />
            <SpanErro erro={erros[7]} />
          </FormControl>
        </FormGroup>
        <FormControl margin="dense" fullWidth={true}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={erros[8] === '' ? false : true}
          />
          <SpanErro erro={erros[8]} />
        </FormControl>
        {history.location.pathname === '/cadastro' && (
          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="senha">Senha</InputLabel>
            <Input
              id="senha"
              type="password"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
              error={erros[9] === '' ? false : true}
            />
            <SpanErro erro={erros[9]} />
          </FormControl>
        )}
        {tipo_usuario === 'tecnico' && (
          <FormGroup row={true}>
            <FormControl margin="dense" className="input-md">
              <InputLabel htmlFor="tipo-registro_profissional">Tipo Registro</InputLabel>
              <Select
                id="tipo-registro_profissional"
                onChange={(e) => setTiporegistro(e.target.value)}
                value={tipo_registro}
                error={erros[10] === '' ? false : true}
              >
                <MenuItem value="CREA">CREA</MenuItem>
                <MenuItem value="CRMV">CRMV</MenuItem>
              </Select>
              <SpanErro erro={erros[10]} />
            </FormControl>
            <FormControl margin="dense" className="input-md ml-input-md">
              <InputLabel htmlFor="numero-registro_profissional">Número do Registro</InputLabel>
              <Input
                id="numero-registro_profissional"
                onChange={(e) => setRegistroProfissional(e.target.value)}
                value={registro_profissional}
                error={erros[11] === '' ? false : true}
              />
              <SpanErro erro={erros[11]} />
            </FormControl>
            <FormControl margin="dense" className="input-md ml-input-md">
              <InputLabel htmlFor="ano-formatura">Ano Formatura</InputLabel>
              <Input
                id="ano-formatura"
                onKeyDown={(e) =>
                  confereNumeroOuBackspace(e) ? setAnoFormatura(apenasAno(e.key, anoFormatura)) : null
                }
                value={anoFormatura}
                error={erros[12] === '' ? false : true}
              />
              <SpanErro erro={erros[12]} />
            </FormControl>
          </FormGroup>
        )}
        {tipo_usuario === 'proprietario' && (
          <div className="container-input-cnpj">
            <FormControl margin="dense" className="input-lg">
              <InputLabel htmlFor="cnpj">CNPJ</InputLabel>
              <Input
                id="cnpj"
                // onKeyDown={e => confereNumeroOuBackspace(e) ? setCNPJ(apenasAno(e.key, anoFormatura)) : null}
                onChange={(e) => setCNPJ(e.target.value)}
                value={cnpj}
                error={erros[13] === '' ? false : true}
                disabled={cnpj === 'Não possuo.' ? true : false}
              />
              <SpanErro erro={erros[13]} />
            </FormControl>
            <div className="container-checkbox-cnpj">
              <Checkbox
                value={cnpj}
                size="medium"
                onChange={() => (cnpj !== 'Não possuo.' ? setCNPJ('Não possuo.') : setCNPJ(''))}
                checked={cnpj === 'Não possuo.' ? true : false}
              />
              <span id="check-cnpj">Não possuo CNPJ</span>
            </div>
          </div>
        )}
        <ButtonSubmitForm funcao={cadastrarUsuarioTecnico} text="Cadastrar" loading={loading} />
        {history.location.pathname === '/cadastro' && (
          <LinkRedirect text="Já tem senha? Clique aqui e faça login!" url="/" />
        )}
      </ContainerForm>
    </ContainerMain>
  )
}
