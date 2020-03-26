import React, { useState } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import { FormGroup, FormControl, InputLabel, Input, Select, MenuItem } from '@material-ui/core'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'

export default function CadastrarAnimal({ history }) {
  const [identificacao_animal, setIdentificacaoAnimal] = useState('')
  const [sexo, setSexo] = useState('Selecione o sexo')
  const [peso, setPeso] = useState('')
  const [raca, setRaca] = useState('')
  const [status, setStatus] = useState('')
  const id_propriedade = history?.location?.state?.id_propriedade
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  if (!id_propriedade) {
    history.push('/menu')
  }

  const limpar = () => {
    setIdentificacaoAnimal('')
    setSexo('Selecione o sexo')
    setPeso('')
    setRaca('')
    setStatus('')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarAnimal = async () => {
    setLoading(true)
    const response = await api.post(`/animal/${id_propriedade}/novo`, {
      identificacao_animal,
      sexo,
      peso,
      raca,
      status,
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
            <InputLabel htmlFor="identificacao-animal">Identificação do Animal</InputLabel>
            <Input
              id="identificacao-animal"
              onChange={e => setIdentificacaoAnimal(e.target.value)}
              value={identificacao_animal}
            />
          </FormControl>
        </FormGroup>
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <InputLabel htmlFor="sexo" type="select" />
            <Select
              labelId="sexo"
              id="input-sexo"
              value={sexo}
              onChange={e => {
                setSexo(e.target.value)
              }}
            >
              <MenuItem value="Selecione o sexo">
                <em>Selecione sexo animal</em>
              </MenuItem>
              <MenuItem value={'M'}>
                <em>Macho</em>
              </MenuItem>
              <MenuItem value={'F'}>
                <em>Fêmea</em>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="peso">Peso</InputLabel>
            <Input id="peso" onChange={e => setPeso(e.target.value)} value={peso} type="number" />
          </FormControl>
        </FormGroup>
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <InputLabel htmlFor="raca">Raça</InputLabel>
            <Input id="raca" onChange={e => setRaca(e.target.value)} value={raca} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="status">Status</InputLabel>
            <Input id="status" onChange={e => setStatus(e.target.value)} value={status} />
          </FormControl>
        </FormGroup>
        <ButtonSubmitForm text="Cadastrar animal" funcao={cadastrarAnimal} loading={loading} />
      </ContainerForm>
    </ContainerMain>
  )
}
