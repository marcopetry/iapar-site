import React, { useState } from 'react'
import { FormGroup, FormControl, TextField, InputLabel, Select, MenuItem } from '@material-ui/core'
import api from '../../services/api'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'

export default function CadastrarSelecionarForragem({ pegarIdForragem, idForragem, vidaUtil }) {
  const [forragens, setForragem] = useState([])
  const [forragemSelecionada, setForragemSelecionada] = useState(idForragem || 'Selecione')
  const [tipo_forragem, setTipoForragem] = useState('')
  const [nome_forragem, setNomeforragem] = useState('')
  const [loading, setLoading] = useState(false)

  useState(() => {
    buscarForragens()
  }, [])

  async function buscarForragens() {
    const response = await api.get('/forragem', { headers: { 'x-access-token': localStorage.getItem('token') } })
    setForragem(response.data)
  }

  async function cadastrarForragem() {
    setLoading(true)
    const response = await api.post('/forragem', {
      nome_forragem,
      tipo_forragem,
      token: localStorage.getItem('token')
    })
    setLoading(false)
    if (response.data) {
      setForragemSelecionada(response.data?.id)
      pegarIdForragem(response.data?.id)
      await buscarForragens()
    }
  }

  return (
    <>
      {forragemSelecionada !== 'adicionar' && (
        <FormGroup row={true}>
          <FormControl className="w-45 mr-10">
            <InputLabel id="forragem">Forragem</InputLabel>
            <Select
              labelId="forragem"
              id="input-forragem"
              value={forragemSelecionada}
              onChange={e => {
                setForragemSelecionada(e.target.value)
                pegarIdForragem(e.target.value)
              }}
            >
              <MenuItem value="Selecione">
                <em>Selecionar forragem</em>
              </MenuItem>
              {forragens.map(item => {
                return (
                  <MenuItem value={item.id}>
                    <em>{item.nome_forragem}</em>
                  </MenuItem>
                )
              })}
              <MenuItem value="adicionar">
                <em>Adicionar forragem</em>
              </MenuItem>
            </Select>
          </FormControl>
          {vidaUtil}
        </FormGroup>
      )}

      {forragemSelecionada === 'adicionar' && (
        <>
          <FormGroup row={true}>
            <FormControl margin="dense" className="w-45 mr-10">
              <TextField
                id="nome-forragem"
                label="Nome forragem"
                onChange={e => setNomeforragem(e.target.value)}
                value={nome_forragem}
              />
            </FormControl>
            <FormControl className="w-45">
              <InputLabel id="forragem">Tipo Forragem</InputLabel>
              <Select
                labelId="forragem"
                id="input-forragem"
                value={tipo_forragem}
                onChange={e => setTipoForragem(e.target.value)}
              >
                <MenuItem value="">
                  <em>Selecionar tipo forragem</em>
                </MenuItem>
                <MenuItem value="Anual">
                  <em>Anual</em>
                </MenuItem>
                <MenuItem value="Perene">
                  <em>Perene</em>
                </MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <div className="w-45">
            <ButtonSubmitForm text="adicionar forragem" funcao={cadastrarForragem} loading={loading} />
          </div>
        </>
      )}
    </>
  )
}
