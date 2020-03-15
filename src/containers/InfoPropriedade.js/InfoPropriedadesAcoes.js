import React from 'react'
import { useHistory } from 'react-router-dom'
import './InfoPropriedadesAcoes.css'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'

export default function InfoPropriedadeAcoes({ dadosPropriedade }) {
  const history = useHistory()
  const funcaoInventario = () => {
    history.push(`/menu/dados-propriedade/${dadosPropriedade.id_propriedade_tecnico}`)
  }

  return (
    <div className="container-btns-acoes-info-propriedades">
      <ButtonSubmitForm
        text="Inventário"
        classCSS="btn-acao-info-propriedade btn-inventario"
        funcao={funcaoInventario}
      />
      <ButtonSubmitForm text="Editar informações" classCSS="btn-acao-info-propriedade btn-inventario" />
      <ButtonSubmitForm text="Concluir" classCSS="btn-acao-info-propriedade" funcao={() => history.push('/menu')} />
    </div>
  )
}
