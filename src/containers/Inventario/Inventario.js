import React, { useState } from 'react'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import { FormGroup, FormControl, TextField } from '@material-ui/core'
import SpanErro from '../../components/span-erro/span-erro'
import CadastrarSelecionarForragem from '../CadastrarSelecionarForragem/CadastrarSelecionarForragem'

export default function Inventario() {
  const [id_forragem, setIdForragem] = useState('')
  const [tipoForragem, setTipoForragem] = useState('')
  const pegarIdForragem = e => setIdForragem(e)

  console.log(id_forragem)
  return (
    <ContainerMain>
      <ContainerForm maxWidth="md" classCSS="py-2">
        <CadastrarSelecionarForragem pegarIdForragem={pegarIdForragem} />
        <FormGroup row={true}>
          <FormControl margin="dense" className="w-45 mr-10">
            <TextField
              id="data-inicio-programa"
              label="Data Início Programa"
              type="date"
              onChange={e => e.target.value}
              value={''}
              //error={erros[1] !== '' ? true : false}
              //defaultValue="2017-05-24"
              //className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <SpanErro erro={''} />
          </FormControl>
          <FormControl margin="dense" className="w-45">
            <TextField
              id="data-proxima-visita"
              label="Data Próxima Visita"
              type="date"
              onChange={e => setTipoForragem(e.target.value)}
              value={tipoForragem}
              //error={erros[2] !== '' ? true : false}
              //defaultValue="2017-05-24"
              //className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <SpanErro erro={''} />
          </FormControl>
        </FormGroup>
      </ContainerForm>
    </ContainerMain>
  )
}
