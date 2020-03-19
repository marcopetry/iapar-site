import React, { useState } from 'react'
import './CadastrarInfoPropriedade.css'
import { useParams } from 'react-router-dom'
import { FormControl, FormGroup, Input, InputLabel, TextField, InputAdornment } from '@material-ui/core'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'
import { validarInformacoesPropriedade } from '../../validators/validator-info-propriedade'
import api from '../../services/api'
import { preencherArrayErrosComVazio } from '../../helpers/preencherArrayErrosComVazio'
import SpanErro from '../../components/span-erro/span-erro'
import { Alert } from '@material-ui/lab'

export default function CadastrarInfoPropriedade({ history }) {
  const [data_insercao, setData] = useState('')
  const [area_total, setAreaTotal] = useState()
  const [total_terra_arrendada, setTotalTerraArrendada] = useState()
  const [area_bovinucultura, setAreaBovinucultura] = useState()
  const [area_pasto_perene, setAreaPastoPerene] = useState()
  const [area_lavoura_inverno, setAreaLavouraInverno] = useState()
  const [area_lavoura_verao, setAreaLavouraVerao] = useState()
  const [preco_medio_terra_nua, setPrecoMedioTerraNua] = useState()
  const [preco_medio_arrendamento, setPrecoMedioArrendamento] = useState()
  const [qtd_pessoas_envolvidas_atividade, setQtdPessoasEnvolvidas] = useState()
  const [mapa_uso_propriedade, setMapaUso] = useState('')
  const [loading, setLoading] = useState(false)
  const [erros, setErros] = useState(preencherArrayErrosComVazio(10))
  const [erroBackend, setErroBackend] = useState('')
  const { id_propriedade_tecnico } = useParams()

  async function cadastrarInformacoesPropriedade() {
    const dados = {
      data_insercao,
      area_total,
      total_terra_arrendada,
      area_bovinucultura,
      area_pasto_perene,
      area_lavoura_verao,
      area_lavoura_inverno,
      preco_medio_arrendamento,
      preco_medio_terra_nua,
      qtd_pessoas_envolvidas_atividade,
      id_propriedade_tecnico,
      token: localStorage.getItem('token')
    }

    const errosValidados = validarInformacoesPropriedade(dados)
    setErros(errosValidados)
    if (errosValidados.some(erro => erro !== '')) {
      return
    }
    setLoading(true)
    const response = await api.post('/info-propriedade', dados)

    if (response.data.message !== 'Problemas ao cadastrar propriedade.') {
      history.push(
        `/menu/cadastrar-propriedade/inventario-recursos/${id_propriedade_tecnico}/${response.data.info_propriedade.id}`,
        {
          info_propriedade: response.data.info_propriedade
        }
      )
    } else {
      setErroBackend(response.data.message)
    }
    setLoading(false)
  }

  return (
    <ContainerMain>
      {erroBackend !== '' && <Alert severity="error">{erroBackend}</Alert>}
      <ContainerForm maxWidth="sm">
        <FormGroup row={true} className="container-row-form-info-propriedade">
          <FormControl margin="dense" className="w-45">
            <TextField
              id="data-insercao"
              label="Data Inserção"
              type="date"
              onChange={e => setData(e.target.value)}
              value={data_insercao}
              error={erros[0] === '' ? false : true}
              InputLabelProps={{
                shrink: true
              }}
            />
            <SpanErro erro={erros[0]} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="qtd-pessoas-envolvidas">Qtd Pessoas Envolvidas</InputLabel>
            <Input
              id="qtd-pessoas-envolvidas"
              onChange={e => setQtdPessoasEnvolvidas(e.target.value)}
              value={qtd_pessoas_envolvidas_atividade}
              type="number"
              error={erros[1] === '' ? false : true}
            />
            <SpanErro erro={erros[1]} />
          </FormControl>
        </FormGroup>

        <FormGroup row={true} className="container-row-form-info-propriedade">
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="area-total">Área Total</InputLabel>
            <Input
              id="area-total"
              onChange={e => setAreaTotal(e.target.value)}
              value={area_total}
              type="number"
              endAdornment={
                <InputAdornment position="start" className="mr-4">
                  ha
                </InputAdornment>
              }
              error={erros[2] === '' ? false : true}
            />
            <SpanErro erro={erros[2]} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="area-arrendada">Área Arrendada</InputLabel>
            <Input
              id="area-arrendada"
              onChange={e => setTotalTerraArrendada(e.target.value)}
              value={total_terra_arrendada}
              type="number"
              endAdornment={
                <InputAdornment position="start" className="mr-4">
                  ha
                </InputAdornment>
              }
              error={erros[3] === '' ? false : true}
            />
            <SpanErro erro={erros[3]} />
          </FormControl>
        </FormGroup>

        <FormGroup row={true} className="container-row-form-info-propriedade">
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="area-bovinucultura">Área Bovinucultura</InputLabel>
            <Input
              id="area-bovinucultura"
              onChange={e => setAreaBovinucultura(e.target.value)}
              value={area_bovinucultura}
              type="number"
              endAdornment={
                <InputAdornment position="start" className="mr-4">
                  ha
                </InputAdornment>
              }
              error={erros[4] === '' ? false : true}
            />
            <SpanErro erro={erros[4]} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="area-pasto-perene">Área Pasto Perene</InputLabel>
            <Input
              id="area-pasto-perene"
              onChange={e => setAreaPastoPerene(e.target.value)}
              value={area_pasto_perene}
              type="number"
              endAdornment={
                <InputAdornment position="start" className="mr-4">
                  ha
                </InputAdornment>
              }
              error={erros[5] === '' ? false : true}
            />
            <SpanErro erro={erros[5]} />
          </FormControl>
        </FormGroup>

        <FormGroup row={true} className="container-row-form-info-propriedade">
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="area-lavoura-inverno">Área Lavoura Inverno</InputLabel>
            <Input
              id="area-lavoura-inverno"
              onChange={e => setAreaLavouraInverno(e.target.value)}
              value={area_lavoura_inverno}
              type="number"
              endAdornment={
                <InputAdornment position="start" className="mr-4">
                  ha
                </InputAdornment>
              }
              error={erros[6] === '' ? false : true}
            />
            <SpanErro erro={erros[6]} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="area-lavoura-verao">Área Lavoura Verão</InputLabel>
            <Input
              id="area-lavoura-verao"
              onChange={e => setAreaLavouraVerao(e.target.value)}
              value={area_lavoura_verao}
              type="number"
              endAdornment={
                <InputAdornment position="start" className="mr-4">
                  ha
                </InputAdornment>
              }
              error={erros[7] === '' ? false : true}
            />
            <SpanErro erro={erros[7]} />
          </FormControl>
        </FormGroup>

        <FormGroup row={true} className="container-row-form-info-propriedade">
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="preco-medio-terra-nua">Preço Terra Nua</InputLabel>
            <Input
              id="preco-medio-terra-nua"
              onChange={e => setPrecoMedioTerraNua(e.target.value)}
              value={preco_medio_terra_nua}
              type="number"
              startAdornment={
                <InputAdornment position="start" className="mr-2">
                  R$
                </InputAdornment>
              }
              error={erros[8] === '' ? false : true}
            />
            <SpanErro erro={erros[8]} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <InputLabel htmlFor="preco-medio-arrendamento">Preço Arrendamento</InputLabel>
            <Input
              id="preco-medio-arrendamento"
              onChange={e => setPrecoMedioArrendamento(e.target.value)}
              value={preco_medio_arrendamento}
              type="number"
              startAdornment={
                <InputAdornment position="start" className="mr-2">
                  R$
                </InputAdornment>
              }
              error={erros[9] === '' ? false : true}
            />
            <SpanErro erro={erros[9]} />
          </FormControl>
        </FormGroup>
        <FormControl className="w-45 mt-3">
          <label id="label-mapa-file">Mapa de Uso da Terra</label>
          <input
            type="file"
            id="mapa-uso-terra"
            onChange={e => setMapaUso(e.target.value)}
            value={mapa_uso_propriedade}
            text=""
          />
        </FormControl>
        <div className="container-btns-inventario">
          <ButtonSubmitForm text="Concluir" funcao={() => history.push(`/menu`)} classCSS="w-45 btn-secondary" />
          <ButtonSubmitForm
            text="Cadastrar"
            loading={loading}
            funcao={cadastrarInformacoesPropriedade}
            classCSS="w-45"
          />
        </div>
      </ContainerForm>
    </ContainerMain>
  )
}
