import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './InfoPropriedade.css'
import api from '../../services/api'
import ApresentarInfosDetalhadas from '../../components/apresentarInfoDetalhadas/ApresentarInfosDetalhadas'
import { formatDadosInfoPropriedade } from '../../helpers/formatDadosInfoPropriedade'
import TelaEspera from '../../components/tela-espera/tela-espera'
import InfoPropriedadeAcoes from './InfoPropriedadesAcoes'

export default function InfoPropriedade() {
  const [dadosPropriedade, setDadosPropriedade] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id_propriedade_tecnico } = useParams()

  if (localStorage.getItem('token') && !dadosPropriedade) {
    buscarDadosPropriedade()
  }
  async function buscarDadosPropriedade() {
    const response = await api.get(`/info-propriedade/${id_propriedade_tecnico}`, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    })
    setDadosPropriedade(response.data.dadosPropriedade)
    setLoading(false)
  }

  if (loading && !dadosPropriedade) {
    return <TelaEspera mensagem="Estamos buscando suas informações ... " />
  }

  return (
    <ApresentarInfosDetalhadas dados={formatDadosInfoPropriedade(dadosPropriedade)}>
      <InfoPropriedadeAcoes dadosPropriedade={dadosPropriedade} />
    </ApresentarInfosDetalhadas>
  )
}
