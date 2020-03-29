import React, { useState, useEffect } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import { FormGroup, FormControl, InputLabel, Input, Select, MenuItem, TextField } from '@material-ui/core'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'

export default function PartoAnimal({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_animal, setIdAnimal] = useState('Selecione animal')
  const [identificacao_animal, setIdentificacaoAnimal] = useState('')
  const [sexo, setSexo] = useState('Selecione o sexo')
  const [peso, setPeso] = useState('')
  const [raca, setRaca] = useState('')
  const [data_parto, setDataParto] = useState('')
  const [condicao_nascimento, setCondicaoNascimento] = useState('Vivo')
  const id_propriedade = history?.location?.state?.id_propriedade
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const buscarAnimais = async () => {
      const response = await retornarAnimaisPropriedade(history)
      setAnimais(response.data)
    }
    buscarAnimais()
  }, [history])

  if (!id_propriedade) {
    history.push('/menu')
  }

  const limpar = () => {
    setIdentificacaoAnimal('')
    setSexo('Selecione o sexo')
    setPeso('')
    setRaca('')
    setCondicaoNascimento('Vivo')
    setDataParto('')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarAnimal = async () => {
    setLoading(true)
    const response = await api.post(`/parto/${id_propriedade}/novo`, {
      identificacao_animal,
      id_mae: id_animal,
      sexo,
      peso,
      raca,
      status: 'Recém nascido',
      condicao_nascimento,
      data_parto,
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

  if (id_animal === 'Adicionar') {
    history.push('/menu/inclusoes-rapidas/cadastrar-animal', history.location.state)
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm">
        {feedback !== '' && <Alert>{feedback}</Alert>}
        <FormGroup row={true} className="mt-4">
          <FormControl className="w-45 mr-10">
            <InputLabel id="input-vaca">Selecione a vaca</InputLabel>
            <Select
              labelId="input-vaca"
              id="select-vaca"
              value={id_animal}
              onChange={e => {
                setIdAnimal(e.target.value)
              }}
            >
              <MenuItem value="Selecione animal">
                <em>Selecionar animal</em>
              </MenuItem>
              {animais.map(item => {
                return (
                  <MenuItem value={item.id}>
                    <em>{item.identificacao_animal}</em>
                  </MenuItem>
                )
              })}
              <MenuItem value="Adicionar">
                <em>Adicionar animal +</em>
              </MenuItem>
            </Select>
          </FormControl>
        </FormGroup>

        <FormGroup row={true} fullWidth>
          <FormControl margin="dense" className="w-45 mr-10">
            <InputLabel htmlFor="identificacao-bezerro">Identificação do Bezerro</InputLabel>
            <Input
              id="identificacao-bezerro"
              onChange={e => setIdentificacaoAnimal(e.target.value)}
              value={identificacao_animal}
            />
          </FormControl>
          <FormControl margin="dense" className="w-45">
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
                <em>Selecione sexo bezerro</em>
              </MenuItem>
              <MenuItem value={'M'}>
                <em>Macho</em>
              </MenuItem>
              <MenuItem value={'F'}>
                <em>Fêmea</em>
              </MenuItem>
            </Select>
          </FormControl>
        </FormGroup>

        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <InputLabel htmlFor="peso">Peso</InputLabel>
            <Input id="peso" onChange={e => setPeso(e.target.value)} value={peso} type="number" />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="raca">Raça</InputLabel>
            <Input id="raca" onChange={e => setRaca(e.target.value)} value={raca} />
          </FormControl>
        </FormGroup>
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <TextField
              id="data-nascimento"
              label="Data Parto"
              type="date"
              onChange={e => setDataParto(e.target.value)}
              value={data_parto}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel id="condicao-nascimento">Condição Nascimento</InputLabel>
            <Select
              labelId="condicao-nascimento"
              id="select-condicao-nascimento"
              value={condicao_nascimento}
              onChange={e => {
                setIdAnimal(e.target.value)
              }}
            >
              <MenuItem value="Vivo">
                <em>Vivo</em>
              </MenuItem>
              <MenuItem value="Morto">
                <em>Morto</em>
              </MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <ButtonSubmitForm text="Cadastrar parto" funcao={cadastrarAnimal} loading={loading} />
      </ContainerForm>
    </ContainerMain>
  )
}
