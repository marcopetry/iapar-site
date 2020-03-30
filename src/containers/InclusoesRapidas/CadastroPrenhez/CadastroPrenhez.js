import React, { useEffect, useState } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  TextField
} from '@material-ui/core'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import api from '../../../services/api'
import { formatarData } from '../../../helpers/formatData'
import { Alert } from '@material-ui/lab'

export default function CadastroPrenhez({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_vaca, setIdVaca] = useState('Selecione vaca')
  const [id_touro, setIdTouro] = useState('Selecione touro')
  const [tipo_prenhez, setTipoPrenhez] = useState('')
  const [data_diagnostico, setDataDiagnostico] = useState('')
  const [data_prenhez, setDataPrenhez] = useState('')
  const [ultimaInseminacao, setUltimaInseminacao] = useState({})
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
    buscarAnimais()
    const buscarUltimaInseminacao = async () => {
      const response = await api.get(`/inseminacao/ultima/${id_vaca}`, {
        headers: { 'x-access-token': localStorage.getItem('token') }
      })
      setUltimaInseminacao(response.data)
    }
    if (tipo_prenhez === 'Inseminação') {
      buscarUltimaInseminacao()
    }
  }, [history, tipo_prenhez, id_vaca])

  const limpar = () => {
    setIdVaca('Selecione vaca')
    setIdTouro('Selecione touro')
    setTipoPrenhez('')
    setDataPrenhez('')
    setDataDiagnostico('')
    setUltimaInseminacao({})
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarPrenhez = async () => {
    setLoading(true)
    const response = await api.post(`/prenhez/${id_propriedade}/novo`, {
      id_vaca,
      id_touro: id_touro === 'Selecione touro' ? null : id_touro,
      tipo_prenhez,
      id_inseminacao: ultimaInseminacao === {} ? null : ultimaInseminacao.id,
      data_diagnostico,
      data_prenhez,
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

  if (id_vaca === 'Adicionar') {
    history.push('/menu/inclusoes-rapidas/cadastrar-animal', history.location.state)
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm">
        {feedback !== '' && <Alert>{feedback}</Alert>}
        <FormControl className="w-45 mr-10 mt-4">
          <InputLabel id="forragem">Vaca</InputLabel>
          <Select
            labelId="Vaca"
            id="input-vaca"
            value={id_vaca}
            onChange={e => {
              setIdVaca(e.target.value)
            }}
          >
            <MenuItem value="Selecione vaca">
              <em>Selecionar vaca</em>
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

        {tipo_prenhez === 'Monta natural' && (
          <FormControl className="w-45 mt-4">
            <InputLabel id="forragem">Touro</InputLabel>
            <Select
              labelId="Touro"
              id="input-vaca"
              value={id_touro}
              onChange={e => {
                setIdTouro(e.target.value)
              }}
            >
              <MenuItem value="Selecione touro">
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
        )}

        <FormControl component="fieldset" className="mt-3">
          <FormLabel component="legend">Tipo de Prenhez</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Inseminação"
                  onChange={e => setTipoPrenhez(e.target.value)}
                  checked={tipo_prenhez === 'Inseminação' ? true : false}
                />
              }
              label="Inseminação"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Monta natural"
                  onChange={e => setTipoPrenhez(e.target.value)}
                  checked={tipo_prenhez === 'Monta natural' ? true : false}
                />
              }
              label="Monta Natural"
            />
          </RadioGroup>
        </FormControl>

        {tipo_prenhez === 'Inseminação' && ultimaInseminacao !== {} && (
          <div>
            <h4>Data última inseminação: {formatarData(ultimaInseminacao.data_inseminacao)}</h4>
          </div>
        )}

        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <TextField
              id="data-diagnostico"
              label="Data Diagnóstico"
              type="date"
              onChange={e => setDataDiagnostico(e.target.value)}
              value={data_diagnostico}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <TextField
              id="data-prenhez"
              label="Data Prenhez"
              type="date"
              onChange={e => setDataPrenhez(e.target.value)}
              value={data_prenhez}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </FormGroup>
        <ButtonSubmitForm text="Cadastrar Prenhez" funcao={cadastrarPrenhez} loading={loading} />
      </ContainerForm>
    </ContainerMain>
  )
}
