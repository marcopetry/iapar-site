import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './InfoPropriedadesAcoes.css'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'

export default function InfoPropriedadeAcoes({ dadosPropriedade }) {
  const history = useHistory()
  const { id_propriedade_tecnico } = useParams()

  return (
    <div className="container-btns-acoes-info-propriedades">
      <ButtonSubmitForm
        text="Inventário"
        classCSS="btn-acao-info-propriedade btn-inventario"
        funcao={() =>
          history.push(
            `/menu/cadastrar-propriedade/inventario-recursos/${id_propriedade_tecnico}/${dadosPropriedade.id}/novo`
          )
        }
      />
      <ButtonSubmitForm
        text="Editar informações"
        classCSS="btn-acao-info-propriedade btn-inventario"
        funcao={() => history.push(`/menu/dados-propriedade/${id_propriedade_tecnico}`)}
      />
      <ButtonSubmitForm text="Concluir" classCSS="btn-acao-info-propriedade" funcao={() => history.push('/menu')} />
    </div>
  )
}

///menu/cadastrar-propriedade/inventario-recursos/:id_propriedade_tecnico/:id_info_propriedade/novo
