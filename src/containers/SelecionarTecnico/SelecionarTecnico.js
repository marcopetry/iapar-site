import React, { useState, useEffect } from 'react'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import api from '../../services/api'
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes'
import { headerListTecnicos } from '../../helpers/itensTable/headersTables'
import { formatarDadosTecnico } from '../../helpers/itensTable/formatdatesTable'
import FeedbackComButton from '../../components/feedbackComButton/feedbackComButton'
import TelaEspera from '../../components/tela-espera/tela-espera'
import Feedback from '../../components/feedback/feedback'

export default function SelecionarTecnico({ history }) {
  const [tecnicos, setTecnicos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function buscarTecnicos() {
      setLoading(true)
      const response = await api.get('/tecnicos', { headers: { 'x-access-token': localStorage.getItem('token') } })

      setLoading(false)
      if (response.data.message === 'Problema no carregamento') {
        setTecnicos(response.data.message)
      } else {
        setTecnicos(formatarDadosTecnico(response.data))
      }
    }
    if (tecnicos.length === 0) {
      buscarTecnicos()
    }
  }, [])

  //recebe como parãmetro um array com os selecionados na tabela
  const selecionarTecnicos = tecnicosSelecionados => {
    if (tecnicosSelecionados.length === 0) {
      alert('Você precisa selecionar os técnicos para a propriedade.')
      return
    }
    const idProprietario = history.location.pathname.split('/')[3]
    history.push(`/menu/cadastrar-propriedade/${idProprietario}/tecnicos/dados-propriedade`, { tecnicosSelecionados })
  }

  if (loading) {
    return <TelaEspera mensagem="Estamos carregando suas informações ..." />
  }

  if ((tecnicos === 'Problema no carregamento' || tecnicos.length === 0) && !loading) {
    return <Feedback msg={'Problema no carregamento.'} />
  }

  return (
    <ContainerMain>
      <ContainerForm classCSS="p-0">
        <ListarInformacoes
          headCells={headerListTecnicos}
          rows={tecnicos}
          title="Selecione técnicos"
          orderByProp="nome"
          funcao={selecionarTecnicos}
        />
      </ContainerForm>
    </ContainerMain>
  )
}
