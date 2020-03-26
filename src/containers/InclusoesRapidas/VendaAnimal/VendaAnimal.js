import React, { useEffect, useState } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'
import { FormControl, InputLabel, Select, MenuItem, TextField, FormGroup, Input } from '@material-ui/core'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'

export default function VendaAnimal({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_animal, setIdAnimal] = useState('Selecione animal')
  const [data_venda, setDataVenda] = useState('')
  const [motivo, setMotivo] = useState('')
  const [valor, setValor] = useState('')
  const [destino, setDestino] = useState('')
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
    setMotivo('')
    setDataVenda('')
    setValor('')
    setDestino('')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarVenda = async () => {
    setLoading(true)
    const response = await api.post(`/venda/${id_propriedade}/novo`, {
      id_animal,
      data_venda,
      motivo,
      destino,
      valor,
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
            label="Data da Venda"
            type="date"
            onChange={e => setDataVenda(e.target.value)}
            value={data_venda}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <InputLabel htmlFor="valor">Valor</InputLabel>
            <Input id="valor" onChange={e => setValor(e.target.value)} value={valor} type="number" />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="destino">Destino</InputLabel>
            <Input id="destino" onChange={e => setDestino(e.target.value)} value={destino} />
          </FormControl>
        </FormGroup>
        <FormControl margin="dense" fullWidth>
          <TextField
            id="diagnostico"
            label="Motivo da venda"
            multiline
            rows={5}
            onChange={e => setMotivo(e.target.value)}
            value={motivo}
          />
        </FormControl>
        <ButtonSubmitForm text="Cadastrar Venda" loading={loading} funcao={cadastrarVenda} />
      </ContainerForm>
    </ContainerMain>
  )
}
