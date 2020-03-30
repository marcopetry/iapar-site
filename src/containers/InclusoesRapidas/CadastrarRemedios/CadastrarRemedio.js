import React, { useState } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import { FormGroup, FormControl, InputLabel, Input } from '@material-ui/core'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'

export default function CadastrarRemedio({ history }) {
  const [nome, setNome] = useState('')
  const [principio_ativo, setPrincipioAtivo] = useState('')
  const [forma_aplicacao, setFormaAplicacao] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  const limpar = () => {
    setNome('')
    setPrincipioAtivo('')
    setFormaAplicacao('')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarAnimal = async () => {
    setLoading(true)
    const response = await api.post(`/medicamentos/novo`, {
      nome,
      forma_aplicacao,
      principio_ativo,
      token: localStorage.getItem('token')
    })
    if (response.data?.message === 'Problemas ao cadastrar.') {
      setFeedback(response.data.message)
    } else {
      setFeedback('Cadastrado com sucesso.')
      limpar()
    }

    setLoading(false)
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm">
        {feedback !== '' && <Alert>{feedback}</Alert>}
        <FormGroup row={true}>
          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="nome">Nome</InputLabel>
            <Input id="nome" onChange={e => setNome(e.target.value)} value={nome} />
          </FormControl>
        </FormGroup>
        <FormGroup row={true}>
          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="principio-ativo">Princípio Ativo</InputLabel>
            <Input id="principio-ativo" onChange={e => setPrincipioAtivo(e.target.value)} value={principio_ativo} />
          </FormControl>
        </FormGroup>
        <FormControl margin="dense" fullWidth>
          <InputLabel htmlFor="forma-aplicacao">Forma Aplicação</InputLabel>
          <Input id="forma-aplicacao" onChange={e => setFormaAplicacao(e.target.value)} value={forma_aplicacao} />
        </FormControl>
        <ButtonSubmitForm text="Cadastrar Remédio" funcao={cadastrarAnimal} loading={loading} />
      </ContainerForm>
    </ContainerMain>
  )
}
