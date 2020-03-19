import React, { useEffect, useState } from 'react'
import { formatarDadosPropriedades } from '../../helpers/itensTable/formatdatesTable'
import { headerListPropriedades } from '../../helpers/itensTable/headersTables'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes'
import TelaEspera from '../../components/tela-espera/tela-espera'
import api from '../../services/api'
import PropriedadeAcoes from './PropriedadesAcoes'

export default function({ history }) {
  const [propriedades, setPropriedade] = useState([])
  const [propriedadesSelecionadas, setSelecionados] = useState([])

  const pegarSelecionados = selecionados => setSelecionados(selecionados)

  useEffect(() => {
    async function buscarPropriedades() {
      const response = await api.get('propriedade', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      setPropriedade(formatarDadosPropriedades(response.data))
    }
    buscarPropriedades()
  }, [])

  if (propriedades.length === 0) {
    return <TelaEspera />
  }

  return (
    <ContainerMain>
      <ContainerForm classCSS="p-0">
        <ListarInformacoes
          rows={propriedades}
          orderByProp="data_proxima_visita"
          title="Propriedades Cadastradas"
          headCells={headerListPropriedades}
          componentAcoes={
            <PropriedadeAcoes
              propriedadesSelecionadas={propriedadesSelecionadas}
              history={history}
              propriedades={propriedades}
            />
          }
          pegarSelecionado={pegarSelecionados}
        />
      </ContainerForm>
    </ContainerMain>
  )
}

//{rows, orderByProp, title, headCells, funcao}
