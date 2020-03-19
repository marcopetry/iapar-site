import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import {
  FormGroup,
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Input,
  InputAdornment
} from '@material-ui/core'
import SpanErro from '../../components/span-erro/span-erro'
import CadastrarSelecionarForragem from '../CadastrarSelecionarForragem/CadastrarSelecionarForragem'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'
import api from '../../services/api'
import './Inventario.css'

export default function Inventario() {
  const history = useHistory()
  const [id_forragem, setIdForragem] = useState('')
  const [tipo_terra, setTipoTerra] = useState('')
  const [data_formacao, setDataFormacao] = useState('')
  const [custo_medio_formacao, setCustoMedioFormacao] = useState()
  const [area, setArea] = useState('')
  const [vida_util, setVidaUtil] = useState('')
  const [observacao, setObservacao] = useState('')
  const { id_info_propriedade } = useParams()
  const { id_propriedade_tecnico } = useParams()
  const pegarIdForragem = e => setIdForragem(e)
  const [loading, setLoading] = useState(false)

  async function cadastrarInventario() {
    setLoading(true)
    const response = await api.post(`/forragem/${id_info_propriedade}`, {
      id_forragem,
      tipo_terra,
      data_formacao,
      custo_medio_formacao,
      area,
      vida_util,
      observacao,
      token: localStorage.getItem('token')
    })
    limparCampos()
    console.log(response)
    setLoading(false)
  }

  function limparCampos() {
    setIdForragem(null)
    setTipoTerra('')
    setDataFormacao('')
    setCustoMedioFormacao('')
    setArea('')
    setVidaUtil('')
    setObservacao('')
  }

  return (
    <ContainerMain>
      <ContainerForm maxWidth="sm" classCSS="py-2">
        <CadastrarSelecionarForragem
          pegarIdForragem={pegarIdForragem}
          idForragem={id_forragem}
          vidaUtil={
            <FormControl margin="dense" className="w-45">
              <InputLabel htmlFor="vida-util">Vida útil em anos</InputLabel>
              <Input id="vida-util" onChange={e => setVidaUtil(e.target.value)} value={vida_util} type="number" />
            </FormControl>
          }
        />
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <TextField
              id="data-formacao"
              label="Data Formação"
              type="date"
              onChange={e => setDataFormacao(e.target.value)}
              value={data_formacao}
              InputLabelProps={{
                shrink: true
              }}
            />
            <SpanErro erro={''} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="custo-medio-formacao">Custo médio formação</InputLabel>
            <Input
              id="custo-medio-formacao"
              onChange={e => setCustoMedioFormacao(e.target.value)}
              value={custo_medio_formacao}
              type="number"
              startAdornment={
                <InputAdornment position="start" className="mr-2">
                  R$
                </InputAdornment>
              }
            />
          </FormControl>
        </FormGroup>

        <FormGroup row={true}>
          <FormControl component="fieldset" className="w-45 mr-10">
            <FormLabel component="legend">Tipo de terra</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={tipo_terra}
              onChange={e => setTipoTerra(e.target.value)}
              row
            >
              <FormControlLabel value="Própria" control={<Radio />} label="Própria" />
              <FormControlLabel value="Arrendada" control={<Radio />} label="Arrendada" />
            </RadioGroup>
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="area">Área</InputLabel>
            <Input
              id="area"
              onChange={e => setArea(e.target.value)}
              value={area}
              type="number"
              startAdornment={
                <InputAdornment position="start" className="mr-2">
                  Ha
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl margin="dense" className="w-100">
            <TextField
              id="observacao"
              label="Observação"
              multiline
              rows="6"
              variant="outlined"
              value={observacao}
              onChange={e => setObservacao(e.target.value)}
            />
          </FormControl>
        </FormGroup>
        <div className="container-btns-inventario">
          <ButtonSubmitForm
            text="Concluir"
            funcao={() =>
              history.push(
                `/menu/cadastrar-propriedade/inventario-recursos/${id_propriedade_tecnico}/${id_info_propriedade}`
              )
            }
            classCSS="w-45 btn-secondary-inventario"
          />
          <ButtonSubmitForm text="Cadastrar" funcao={cadastrarInventario} loading={loading} classCSS="w-45" />
        </div>
      </ContainerForm>
    </ContainerMain>
  )
}
