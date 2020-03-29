import React, { useEffect, useState } from 'react'
import ContainerMain from '../../../components/container-main/container-main'
import ContainerForm from '../../../components/container-form/container-form'
import { retornarAnimaisPropriedade } from '../../../helpers/retornarAnimaisPropriedade'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel
} from '@material-ui/core'
import ButtonSubmitForm from '../../../components/button-submit-form/button-submit-form'
import api from '../../../services/api'
import { Alert } from '@material-ui/lab'

export default function MastiteAnimal({ history }) {
  const [animais, setAnimais] = useState([])
  const [id_animal, setIdAnimal] = useState('Selecione animal')
  const [data_diagnostico, setDataDiagnostico] = useState('')
  const [tipo_mastite, setTipoMastite] = useState('')
  const [anterior_esquerda, setAnteriorEsquerda] = useState('Ausente')
  const [anterior_direita, setAnteriorDireito] = useState('Ausente')
  const [posterior_esquerda, setPosteriorEsquerda] = useState('Ausente')
  const [posterior_direita, setPosteriorDireita] = useState('Ausente')
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
    setTipoMastite('')
    setDataDiagnostico('')
    setAnteriorEsquerda('Ausente')
    setAnteriorDireito('Ausente')
    setPosteriorEsquerda('Ausente')
    setPosteriorDireita('Ausente')
    setTimeout(() => {
      setFeedback('')
    }, 2000)
  }

  const cadastrarDoenca = async () => {
    setLoading(true)
    const response = await api.post(`/mastite/${id_propriedade}/novo`, {
      id_animal,
      data_diagnostico,
      tipo_mastite,
      anterior_esquerda,
      anterior_direita,
      posterior_esquerda,
      posterior_direita,
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
            label="Data Diagnóstico"
            type="date"
            onChange={e => setDataDiagnostico(e.target.value)}
            value={data_diagnostico}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>

        <FormControl component="fieldset" className="mt-2">
          <FormLabel component="legend">Tipo de Mastite</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Clínica"
                  onChange={e => setTipoMastite(e.target.value)}
                  checked={tipo_mastite === 'Clínica' ? true : false}
                />
              }
              label="Clínica"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Subclínica"
                  onChange={e => setTipoMastite(e.target.value)}
                  checked={tipo_mastite === 'Subclínica' ? true : false}
                />
              }
              label="Sub-Clínica"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="mt-2">
          <FormLabel component="legend">Anterior Esquerda</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Ausente"
                  onChange={e => setAnteriorEsquerda(e.target.value)}
                  checked={anterior_esquerda === 'Ausente' ? true : false}
                />
              }
              label="Ausente"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Leve"
                  onChange={e => setAnteriorEsquerda(e.target.value)}
                  checked={anterior_esquerda === 'Leve' ? true : false}
                />
              }
              label="Leve"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Moderada"
                  onChange={e => setAnteriorEsquerda(e.target.value)}
                  checked={anterior_esquerda === 'Moderada' ? true : false}
                />
              }
              label="Moderada"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Severa"
                  onChange={e => setAnteriorEsquerda(e.target.value)}
                  checked={anterior_esquerda === 'Severa' ? true : false}
                />
              }
              label="Severa"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="mt-2">
          <FormLabel component="legend">Anterior Direita</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Ausente"
                  onChange={e => setAnteriorDireito(e.target.value)}
                  checked={anterior_direita === 'Ausente' ? true : false}
                />
              }
              label="Ausente"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Leve"
                  onChange={e => setAnteriorDireito(e.target.value)}
                  checked={anterior_direita === 'Leve' ? true : false}
                />
              }
              label="Leve"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Moderada"
                  onChange={e => setAnteriorDireito(e.target.value)}
                  checked={anterior_direita === 'Moderada' ? true : false}
                />
              }
              label="Moderada"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Severa"
                  onChange={e => setAnteriorDireito(e.target.value)}
                  checked={anterior_direita === 'Severa' ? true : false}
                />
              }
              label="Severa"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="mt-2">
          <FormLabel component="legend">Posterior Esquerda</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Ausente"
                  onChange={e => setPosteriorEsquerda(e.target.value)}
                  checked={posterior_esquerda === 'Ausente' ? true : false}
                />
              }
              label="Ausente"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Leve"
                  onChange={e => setPosteriorEsquerda(e.target.value)}
                  checked={posterior_esquerda === 'Leve' ? true : false}
                />
              }
              label="Leve"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Moderada"
                  onChange={e => setPosteriorEsquerda(e.target.value)}
                  checked={posterior_esquerda === 'Moderada' ? true : false}
                />
              }
              label="Moderada"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Severa"
                  onChange={e => setPosteriorEsquerda(e.target.value)}
                  checked={posterior_esquerda === 'Severa' ? true : false}
                />
              }
              label="Severa"
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" className="mt-2">
          <FormLabel component="legend">Posterior Direita</FormLabel>
          <RadioGroup row aria-label="position" name="position" defaultValue="top">
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Ausente"
                  onChange={e => setPosteriorDireita(e.target.value)}
                  checked={posterior_direita === 'Ausente' ? true : false}
                />
              }
              label="Ausente"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Leve"
                  onChange={e => setPosteriorDireita(e.target.value)}
                  checked={posterior_direita === 'Leve' ? true : false}
                />
              }
              label="Leve"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Moderada"
                  onChange={e => setPosteriorDireita(e.target.value)}
                  checked={posterior_direita === 'Moderada' ? true : false}
                />
              }
              label="Moderada"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  color="primary"
                  value="Severa"
                  onChange={e => setPosteriorDireita(e.target.value)}
                  checked={posterior_direita === 'Severa' ? true : false}
                />
              }
              label="Severa"
            />
          </RadioGroup>
        </FormControl>
        <ButtonSubmitForm text="Cadastrar Mastite" loading={loading} funcao={cadastrarDoenca} />
      </ContainerForm>
    </ContainerMain>
  )
}
