import React, { useEffect, useState } from 'react'
import { formatarDadosPropriedades } from '../../helpers/itensTable/formatdatesTable'
import { headerListPropriedades } from '../../helpers/itensTable/headersTables'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes'
import TelaEspera from '../../components/tela-espera/tela-espera'
import api from '../../services/api'

export default function({ history }) {
  const [propriedade, setPropriedade] = useState([])

  useEffect(() => {
    async function buscarPropriedades() {
      const response = await api.get('propriedade', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      console.log(response.data)
      setPropriedade(formatarDadosPropriedades(response.data))
    }
    buscarPropriedades()
  }, [])

  if (propriedade.length === 0) {
    return <TelaEspera />
  }

  return (
    <ContainerMain>
      <ContainerForm classCSS="p-0">
        <ListarInformacoes
          rows={propriedade}
          orderByProp="data_proxima_visita"
          title="teste"
          headCells={headerListPropriedades}
          funcao={() => alert('tosco')}
        />
      </ContainerForm>
    </ContainerMain>
  )
}

//{rows, orderByProp, title, headCells, funcao}
