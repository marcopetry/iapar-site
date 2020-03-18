import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './InfoPropriedade.css'
import api from '../../services/api'
import ApresentarInfosDetalhadas from '../../components/apresentarInfoDetalhadas/ApresentarInfosDetalhadas'
import { formatDadosInfoPropriedade } from '../../helpers/formatDadosInfoPropriedade'
import TelaEspera from '../../components/tela-espera/tela-espera'
//import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'
import InfoPropriedadeAcoes from './InfoPropriedadesAcoes'

export default function InfoPropriedade() {
  const history = useHistory()
  const [dadosPropriedade, setDadosPropriedade] = useState({})
  const [loading, setLoading] = useState(true)
  const { id_propriedade_tecnico } = useParams()
  useEffect(() => {
    if (history.location.state?.info_propriedade) {
      setDadosPropriedade(history.location.state.info_propriedade)
      setLoading(false)
    } else if (localStorage.getItem('token')) {
      buscarDadosPropriedade()
    }
  }, [])

  async function buscarDadosPropriedade() {
    const response = await api.get(`/info-propriedade/${id_propriedade_tecnico}`, {
      headers: { 'x-access-token': localStorage.getItem('token') }
    })
    setDadosPropriedade(response.data.dadosPropriedade)
    setLoading(false)
  }

  if (loading && dadosPropriedade) {
    return <TelaEspera mensagem="Estamos buscando suas informações ... " />
  }

  return (
    <ApresentarInfosDetalhadas dados={formatDadosInfoPropriedade(dadosPropriedade)}>
      <InfoPropriedadeAcoes dadosPropriedade={dadosPropriedade} />
    </ApresentarInfosDetalhadas>
  )
}
