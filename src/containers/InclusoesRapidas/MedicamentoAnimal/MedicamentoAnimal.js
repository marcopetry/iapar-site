import React, { useState, useEffect } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import { FormGroup, FormControl, InputLabel, Input, Select, MenuItem, TextField } from '@material-ui/core'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'

export default function MedicamentoAnimal({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_animal, setIdAnimal] = useState('Selecione animal')
  const [remedios, setRemedios] = useState([])
  const [id_medicamento, setIdMedicamento] = useState('Selecione remédio')
  const [data_aplicacao, setDataAplicacao] = useState('')
  const [dose_aplicada, setDoseAplicada] = useState(null)
  const id_propriedade = history?.location?.state?.id_propriedade
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  if (!id_propriedade) {
    history.push('/menu')
  }

  useEffect(() => {
    const buscarAnimais = async () => {
      const response = await retornarAnimaisPropriedade(history)
      setAnimais(response.data)
    }

    const buscarRemedios = async () => {
      const response = await api.get('/medicamento', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      setRemedios(response.data)
    }
    buscarAnimais()
    buscarRemedios()
  }, [history])

  const limpar = () => {
    setIdMedicamento('Selecione remédio')
    setIdAnimal('Selecione animal')
    setDoseAplicada(null)
    setDataAplicacao('')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarAnimal = async () => {
    setLoading(true)
    const response = await api.post(`/tratamento/${id_propriedade}/novo`, {
      id_animal,
      id_medicamento,
      dose_aplicada,
      data_aplicacao,
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

  if (id_animal === 'Adicionar animal') {
    history.push('/menu/inclusoes-rapidas/cadastrar-animal', history.location.state)
  }

  if (id_medicamento === 'Adicionar remedio') {
    history.push('/menu/inclusoes-rapidas/medicamentos', history.location.state)
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm">
        {feedback !== '' && <Alert>{feedback}</Alert>}
        <FormGroup row={true}>
          <FormControl className="w-45 mr-10 mt-4">
            <InputLabel id="forragem">Animal</InputLabel>
            <Select
              labelId="Animal"
              id="input-animal"
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
              <MenuItem value="Adicionar animal">
                <em>Adicionar animal +</em>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl className="w-45 mt-4">
            <InputLabel id="remedio">Remédio</InputLabel>
            <Select
              labelId="Remédio"
              id="input-remedio"
              value={id_medicamento}
              onChange={e => {
                setIdMedicamento(e.target.value)
              }}
            >
              <MenuItem value="Selecione remédio">
                <em>Selecionar remédio</em>
              </MenuItem>
              {remedios.map(item => {
                return (
                  <MenuItem value={item.id}>
                    <em>{item.nome}</em>
                  </MenuItem>
                )
              })}
              <MenuItem value="Adicionar remedio">
                <em>Adicionar remédio +</em>
              </MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <TextField
              id="data-aplicacao"
              label="Data da Aplicação"
              type="date"
              onChange={e => setDataAplicacao(e.target.value)}
              value={data_aplicacao}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="dose-aplicada">Dose Aplicada</InputLabel>
            <Input
              id="forma-aplicada"
              onChange={e => setDoseAplicada(e.target.value)}
              value={dose_aplicada}
              type="number"
            />
          </FormControl>
        </FormGroup>
        <ButtonSubmitForm text="Cadastrar Medicamento" funcao={cadastrarAnimal} loading={loading} />
      </ContainerForm>
    </ContainerMain>
  )
}
