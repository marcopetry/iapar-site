import React, { useState, useEffect } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import { FormGroup, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'

export default function InseminacaoAnimal({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_vaca, setVaca] = useState('Selecionar vaca')
  const [id_touro, setTouro] = useState('Selecionar touro')
  const [data_inseminacao, setDataInseminacao] = useState('')
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
    setVaca('Selecionar vaca')
    setTouro('Selecionar touro')
    setDataInseminacao('')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarAnimal = async () => {
    setLoading(true)
    const response = await api.post(`/inseminacao/${id_propriedade}/novo`, {
      id_vaca,
      id_touro,
      data_inseminacao,
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

  if (id_vaca === 'Adicionar' || id_touro === 'Adicionar') {
    history.push('/menu/inclusoes-rapidas/cadastrar-animal', history.location.state)
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm">
        {feedback !== '' && <Alert>{feedback}</Alert>}
        <FormGroup row={true} className="mt-4">
          <FormControl className="w-45 mr-10">
            <InputLabel id="input-vaca">Selecionar a vaca</InputLabel>
            <Select
              labelId="input-vaca"
              id="select-vaca"
              value={id_vaca}
              onChange={e => {
                setVaca(e.target.value)
              }}
            >
              <MenuItem value="Selecionar vaca">
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

          <FormControl className="w-45">
            <InputLabel id="input-touro">Selecione o touro</InputLabel>
            <Select
              labelId="input-touro"
              id="select-touro"
              value={id_touro}
              onChange={e => {
                setTouro(e.target.value)
              }}
            >
              <MenuItem value="Selecionar touro">
                <em>Selecionar touro</em>
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

        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <TextField
              id="data-inseminacao"
              label="Data Inseminação"
              type="date"
              onChange={e => setDataInseminacao(e.target.value)}
              value={data_inseminacao}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </FormGroup>
        <ButtonSubmitForm text="Cadastrar inseminação" funcao={cadastrarAnimal} loading={loading} />
      </ContainerForm>
    </ContainerMain>
  )
}
