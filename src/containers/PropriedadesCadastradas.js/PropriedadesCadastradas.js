import React, { useEffect, useState } from 'react'
import { formatarDadosPropriedades } from '../../helpers/itensTable/formatdatesTable'
import { headerListPropriedades } from '../../helpers/itensTable/headersTables'
import ContainerMain from '../../components/container-main/container-main'
import ContainerForm from '../../components/container-form/container-form'
import ListarInformacoes from '../../components/listarInformacoes/listarInformacoes'
import TelaEspera from '../../components/tela-espera/tela-espera'
import api from '../../services/api'
import ButtonSubmitForm from '../../components/button-submit-form/button-submit-form'

export default function({ history }) {
  const [propriedade, setPropriedade] = useState([])
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

  if (propriedade.length === 0) {
    return <TelaEspera />
  }

  return (
    <ContainerMain>
      <ContainerForm classCSS="p-0">
        <ListarInformacoes
          rows={propriedade}
          orderByProp="data_proxima_visita"
          title="Propriedades Cadastradas"
          headCells={headerListPropriedades}
          componentAcoes={
            <ButtonSubmitForm loading={false} text="Selecionar" funcao={() => console.log(propriedadesSelecionadas)} />
          }
          pegarSelecionado={pegarSelecionados}
        />
      </ContainerForm>
    </ContainerMain>
  )
}

//{rows, orderByProp, title, headCells, funcao}
