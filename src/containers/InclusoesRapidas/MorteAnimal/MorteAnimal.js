import React, { useEffect, useState } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'

export default function MorteAnimal({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_animal, setIdAnimal] = useState('Selecione animal')
  const [data_obito, setDataObito] = useState('')
  const [causa_morte, setCausaMorte] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const id_propriedade = history?.location?.state?.id_propriedade

  useEffect(() => {
    const buscarAnimais = async () => {
      const response = await retornarAnimaisPropriedade(history)
      setAnimais(response.data)
    }
    buscarAnimais()
  }, [history])

  const limpar = () => {
    setIdAnimal('Selecione animal')
    setCausaMorte('')
    setDataObito('')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarMorte = async () => {
    setLoading(true)
    const response = await api.post(`/morte/${id_propriedade}/novo`, {
      id_animal,
      data_obito,
      causa_morte,
      token: localStorage.getItem('token')
    })
    setLoading(false)
    if (response.data?.message === 'Problemas ao cadastrar.') {
      setFeedback(response.data.message)
    } else {
      setFeedback('Cadastrado com sucesso.')
      limpar()
    }
  }

  if (id_animal === 'Adicionar') {
    history.push('/menu/inclusoes-rapidas/cadastrar-animal', history.location.state)
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm" classCSS="pt-3">
        {feedback !== '' && <Alert>{feedback}</Alert>}
        <FormControl className="w-45 mr-10">
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
            <MenuItem value="Adicionar">
              <em>Adicionar animal +</em>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="dense" className="w-45">
          <TextField
            id="data-nascimento"
            label="Data da Morte"
            type="date"
            onChange={e => setDataObito(e.target.value)}
            value={data_obito}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <TextField
            id="diagnostico"
            label="Causa da morte"
            multiline
            rows={5}
            onChange={e => setCausaMorte(e.target.value)}
            value={causa_morte}
          />
        </FormControl>
        <ButtonSubmitForm text="Cadastrar Morte" loading={loading} funcao={cadastrarMorte} />
      </ContainerForm>
    </ContainerMain>
  )
}
