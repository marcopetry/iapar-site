import React, { useState } from 'react'
import './CadastrarPropriedade.css'
import { FormControl, FormGroup, Input, InputLabel, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import FeedbackComButton from '../../components/feedbackComButton/feedbackComButton'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'
import SpanErro from '../../components/span-erro/span-erro'
import { preencherArrayErrosComVazio } from '../../helpers/preencherArrayErrosComVazio'
import { validatorCadastroPropriedade } from '../../validators/validator-cadastro-propriedade'
import api from '../../services/api'

export default function CadastrarPropriedade({ history }) {
  const [nome_propriedade, setNomePropriedade] = useState('')
  const [longitude, setLongitude] = useState('')
  const [latitude, setLatitude] = useState('')
  const [data_inicio_programa, setDataInicio] = useState('')
  const [data_proxima_visita, setDataProximaVisita] = useState('')
  const [erros, setErros] = useState(preencherArrayErrosComVazio(5))
  const [loading, setLoading] = useState(false)

  async function cadastrarPropriedade() {
    const dadosPropriedade = {
      id_proprietario: parseInt(history.location.pathname.split('/')[3]),
      id_tecnicos: history.location.state.tecnicosSelecionados,
      nome_propriedade,
      longitude,
      latitude,
      data_inicio_programa,
      data_proxima_visita,
      token: localStorage.getItem('token')
    }
    const errosValidados = validatorCadastroPropriedade(dadosPropriedade)
    setErros(errosValidados)
    if (errosValidados.some(elemento => elemento !== '')) {
      return
    }
    setLoading(true)
    const response = await api.post('/propriedade', dadosPropriedade)
    if (response.data.message === 'Propriedade cadastrada com sucesso.') {
      history.push(`/menu/cadastrar-propriedade/dados-propriedade/${response.data.id_propriedade_tecnico}`)
    } else {
      setLoading(false)
    }
  }

  if (loading === 'Propriedade cadastrada com sucesso.') {
    return (
      <FeedbackComButton
        msg={loading}
        textButton="Fazer Inventário"
        funcao={() => history.push('/menu/cadastrar-propriedade/inventario-recursos')}
      />
    )
  }

  return (
    <ContainerMain>
      {typeof loading !== 'boolean' && (
        <Alert className="alert-login" severity="error">
          {loading}
        </Alert>
      )}
      <ContainerForm maxWidth="sm">
        <FormGroup row={true}>
          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="nome-propriedade">Nome Propriedade</InputLabel>
            <Input
              id="nome-propriedade"
              onChange={e => setNomePropriedade(e.target.value)}
              value={nome_propriedade}
              error={erros[0] !== '' ? true : false}
            />
            <SpanErro erro={erros[0]} />
          </FormControl>
        </FormGroup>
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <TextField
              id="data-inicio-programa"
              label="Data Início Programa"
              type="date"
              onChange={e => setDataInicio(e.target.value)}
              value={data_inicio_programa}
              error={erros[1] !== '' ? true : false}
              //defaultValue="2017-05-24"
              //className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <SpanErro erro={erros[1]} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <TextField
              id="data-proxima-visita"
              label="Data Próxima Visita"
              type="date"
              onChange={e => setDataProximaVisita(e.target.value)}
              value={data_proxima_visita}
              error={erros[2] !== '' ? true : false}
              //defaultValue="2017-05-24"
              //className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <SpanErro erro={erros[2]} />
          </FormControl>
        </FormGroup>
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <InputLabel htmlFor="longitude">Longitude</InputLabel>
            <Input
              id="longitude"
              onChange={e => setLongitude(e.target.value)}
              value={longitude}
              error={erros[3] !== '' ? true : false}
              type="number"
            />
            <SpanErro erro={erros[3]} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="latitude">Latitude</InputLabel>
            <Input
              id="latitude"
              onChange={e => setLatitude(e.target.value)}
              value={latitude}
              error={erros[4] !== '' ? true : false}
              type="number"
            />
            <SpanErro erro={erros[4]} />
          </FormControl>
          <ButtonSubmitForm text="Cadastrar" funcao={cadastrarPropriedade} loading={loading} />
        </FormGroup>
      </ContainerForm>
    </ContainerMain>
  )
}
