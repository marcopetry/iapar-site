import React, { useEffect, useState } from 'react'
import './InfoPropriedade.css'
import api from '../../services/api'
import ApresentarInfosDetalhadas from '../../components/apresentarInfoDetalhadas/ApresentarInfosDetalhadas'
import { formatDadosInfoPropriedade } from '../../helpers/formatDadosInfoPropriedade'
import TelaEspera from '../../components/tela-espera/tela-espera'

export default function InfoPropriedade({ history }) {
  const [dadosPropriedade, setDadosPropriedade] = useState({})
  const [loading, setLoading] = useState(true)
  console.log(history)
  const id_propriedade_tecnico = history.location.pathname.split('/')[4]
  useEffect(async () => {
    if (history.location.state?.info_propriedade) {
      setDadosPropriedade(history.location.state.info_propriedade)
      setLoading(false)
    } else if (localStorage.getItem('token')) {
      const response = await api.get(`/info-propriedade/${id_propriedade_tecnico}`, {
        headers: { 'x-access-token': localStorage.getItem('token') }
      })
      console.log(response.data.dadosPropriedade)
      setDadosPropriedade(response.data.dadosPropriedade)
      setLoading(false)
    }
  }, [])

  if (loading && dadosPropriedade) {
    return <TelaEspera mensagem="Estamos buscando suas informações ... " />
  }
  console.log(dadosPropriedade)

  return <ApresentarInfosDetalhadas dados={formatDadosInfoPropriedade(dadosPropriedade)} />
}
